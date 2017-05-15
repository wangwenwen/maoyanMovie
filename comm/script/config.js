// 配置 
// 模块化 module.exports暴露对象，通过require来获取
/*
	1、city 在程序载入获取一次,district区
	2、count ：返回的结果数量（一次20条）
	3、apiList : api
	4、百度地图密钥
	5、。。。。。
	6.服务器中的xampp中图片 http://192.168.0.104/douban3/images/banner_1.jpg
*/
 
var url = 'http://10.80.30.191/'
module.exports = {
	city:'', 
    district:'',
	count:20,  
	baiduAK: 'Y1R5guY8Y2GNRdDpLz7SUeM3QgADAXec',
    apiList: {
        // 百度地图定位
        baiduMap: 'https://api.map.baidu.com/geocoder/v2/',
        // 热门电影http://m.maoyan.com/movie/list.json?type=hot&offset=0&limit=1000
        hot: 'https://m.maoyan.com/movie/list.json',
        // 电影详情https://m.maoyan.com/movie/346383.json
        filmDetail: 'https://m.maoyan.com/movie/',
        // 加载更多评论
        comments:'https://m.maoyan.com/comments.json?movieid=246363&limit=5&offset=5',
        // 查出影院
        cinema:'https://m.maoyan.com/cinemas.json',
        // 查询出影院详情()
        cinemaDetail:'https://m.maoyan.com/showtime/wrap.json',
        // 选座位- https://m.maoyan.com/show/seats?showId=76304&showDate=2015-06-05
        cinemaSeat:'https://m.maoyan.com/show/seats',
        // 搜索还未知
        search: {
            byKeyword: 'https://api.douban.com/v2/movie/search?q=', 
            byTag: 'https://api.douban.com/v2/movie/search?tag='
        } 
    } 
}

