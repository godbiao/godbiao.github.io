/**
 * Created by w on 2016/8/16.
 */
//    终端检测函数
var ua = parseUA();
function parseUA() {
    var u = navigator.userAgent;
    var u2 = navigator.userAgent.toLowerCase();
    return { //移动终端浏览器版本信息
        trident: u.indexOf('Trident') > -1, //IE内核
        presto: u.indexOf('Presto') > -1, //opera内核
        webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
        mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
        iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
        iPad: u.indexOf('iPad') > -1, //是否iPad
        webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
        iosv: u.substr(u.indexOf('iPhone OS') + 9, 3),
        weixin: u2.match(/MicroMessenger/i) == "micromessenger",
        taobao: u.indexOf('AliApp(TB') > -1,
    };
}
// 资源预加载   图片，音频，视频，js，css等文件资源都可以
var images = new Array();
preload(
    "http://stg-smartlearning.com/download/css3d-engine-master/img/yauncheng.png",
    "http://stg-smartlearning.com/download/css3d-engine-master/img/dupian.png",
    "http://stg-smartlearning.com/download/css3d-engine-master/img/feidaoshoushu.png",
    "http://stg-smartlearning.com/download/css3d-engine-master/img/yuanchengkanhu.png",
    "http://stg-smartlearning.com/download/css3d-engine-master/img/shangmentiyan.png",
    "http://stg-smartlearning.com/download/css3d-engine-master/img/yihudaojia.png",
    "http://www.stg-smartlearning.com/download/city/video/guSheng.mp3",
    "http://www.stg-smartlearning.com/download/www/city/video/flash1.mp4",
    "http://www.stg-smartlearning.com/download/www/city/video/flash2.mp4",
    "http://www.stg-smartlearning.com/download/www/city/video/haitong.mp4",
    "http://www.stg-smartlearning.com/download/www/city/video/hang1.mp4",
    "http://www.stg-smartlearning.com/download/www/city/img/1241362.jpg",
    "http://www.stg-smartlearning.com/download/www/city/img/haitong.png",
    "http://www.stg-smartlearning.com/download/www/city/img/ht.png"
);
function preload() {
    for (i = 0; i < preload.arguments.length; i++) {
        images[i] = new Image();
        images[i].src = preload.arguments[i]
    }
}