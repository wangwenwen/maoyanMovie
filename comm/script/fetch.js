// 接口的调用（将其封装成函数）
// 包括电影列表、电影详情、电影搜索等

//公共配置
var config = require("./config.js")
var message = require("../../component/message/message")

  
// 获取电影列表(hasMore) 0-19 
function fetchFilms(url,offset,limit,cb,fail_cb){
	var that = this;
	// 显示拼命加载中友好提示
	if(that.data.showLoading){
		wx.showToast({
			icon:'loading',
			title:'数据加载中',
			duration:10000
		})
	}
	if(that.data.hasNext){
		wx.request({
	 		url:url,
			data:{
				offset:offset,
				limit:limit 
			},
			method:"GET",
	   		header:{
				"Content-Type":"json"
			},
			success:function(res){
				// 隐藏拼命加载中消息提示框
				wx.hideToast()
				console.log(res.data.data.movies)
				// 数据已全部加载完成,初次还未加载
				if(res.data.data.hasNext === false){
					that.setData({
						hasNext:false
					})
					// 做一次数据请求
					wx.request({
					  url: url,
					  data: {offset:offset,limit:limit },
					  method: 'GET',  
					  header:{ "Content-Type":"json" },
					  success: function(res){
						 that.setData({
						 	films:that.data.films.concat(res.data.data.movies),
							offset:that.data.offset+res.data.data.movies.length 
						 })
					  } 
					})
				}else{
					that.setData({
						// push（整个数组参数作为一个元素，直接改变当前数组） 
						// concat （拆开数组参数，一个一个元素加进去，不改变当前数组）
						films:that.data.films.concat(res.data.data.movies),
						offset:that.data.offset+res.data.data.movies.length,
						showLoading:false
					})
				}
				// 停止下拉刷新
				wx.stopPullDownRefresh()
			    typeof cb == "function" && cb(res.data)
			},
			fail:function(){
				that.setData({
					showLoading:false
				})
				// 给到信息提示（用户体验）网络原因 未写
				message.show.call(that,{
					content:"网络不好",
					icon:"poornet",
					duration:3000
				})
				wx.stopPullDownRefresh()
				typeof fail_cb == "function" && fail_cb()
			}
	 	})
	}
}
// 获取电影详情
function fetchFilmDetail(url,id,cb){
	var that = this
    // 显示拼命加载中友好提示
	wx.showToast({
		icon:'loading',
		title:'数据加载中',
		duration:10000
	})
	wx.request({
      url: url+id+'.json', 
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header:{
        'content-type': 'json'
      }, // 设置请求的 header
      success: function(res){ 
        // 隐藏拼命加载中消息提示框
		wx.hideToast()
        var movieValue = res.data.data.MovieDetailModel
        console.log(res)
        that.setData({
          filmDetails:movieValue,
          fdDra:movieValue.dra.substring(3,movieValue.dra.length-4),
          filmAudComments:res.data.data.CommentResponseModel.hcmts.slice(0,3)
        })
        typeof cb == "function" && cb(res.data)
      },
      fail:function(){
        that.setData({
          showLoading:false
        })
        message.show.call(that,{
          content:"网络不好",
          icon:"poornet",
          duration:10000
        })
      }
    })
}
// 获取电影院影片详情
function fetchCinemaDetail(url,cinemaid,movieid,cb){
	var that = this
	wx.request({
      url:url, 
      method: 'GET', 
      data:{
      	cinemaid:cinemaid,
      	movieid:movieid
      },
      header:{
        'content-type': 'json'
      }, // 设置请求的 header
      success: function(res){ 
        that.setData({
        	cinemaInfo: res.data.data.cinemaDetailModel,
        	cinemaMovies: res.data.data.movies,
        	cinemaDates:res.data.data.Dates,//.slice(0,2)
        	cinemaDateShow: res.data.data.DateShow 
        })
        typeof cb == "function" && cb(data)
      },
      fail:function(){
         
      }
    })

}
// 获取电影搜索列表
function feathSearch(url,txt,start,count,cb,fail_cb){
	var that = this;
	//隐藏消息提示框
	message.hide.call(that) 
	// 如果传过来的URL是加密过的，encodeURIComponent(url)
	//这边需要解密 decodeURIComponent(url)
	var url = decodeURIComponent(url)
	if(that.data.hasMore){
		wx.request({
	 		url:url+txt,
			data:{
				start:start,
				count:count 
			},
			method:"GET",
	   		header:{
				"Content-Type":"json"
			},
			success:function(res){ 
				if(res.data.subjects.length === 0){
					that.setData({
						hasMore:false
					})
				}else{
				    that.setData({
						films:that.data.films.concat(res.data.subjects),
						start:that.data.start+res.data.subjects.length,
						showLoading:false
					})
				} 
				wx.stopPullDownRefresh()
			    typeof cb == "function" && cb(res.data)
			},
			fail:function(){
				that.setData({
					showLoading:false
				}) 
				message.show.call(that,{
					content:"网络不好",
					icon:"poornet",
					duration:3000
				})
				wx.stopPullDownRefresh()
				typeof fail_cb == "function" && fail_cb()
			}
	 	})
	}
}
// 暴露在外面
module.exports = {
	fetchFilms:fetchFilms,
	fetchFilmDetail:fetchFilmDetail,
	fetchCinemaDetail:fetchCinemaDetail,
	feathSearch:feathSearch
}
