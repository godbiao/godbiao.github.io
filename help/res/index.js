//事件统计
var _czc = _czc || [];
_czc.push(["_setAccount", "2604584"]);

$(document).ready(function () {
    zoomBody(360);



    $(".dianji").click(function () {
        _czc.push(["_trackEvent", '使用帮助', '体验', '语音']);
    });

    $(".logo").click(function () {
        window.location = "https://www.xunfei.cn";
    });


});



//网页缩放
//s:设计分辨率
function zoomBody(s) {
    //取得浏览器页面可视区域的高度
    var screenHeight = document.documentElement.clientHeight;
    //取得浏览器页面可视区域的宽度
    var screenWidth = document.documentElement.clientWidth;
    //竖屏或者屏幕宽度小于设计分辨率s
    if (screenHeight > screenWidth || screenWidth < s) {
        //缩放body
        document.body.style.zoom = screenWidth / s;
    }
}
