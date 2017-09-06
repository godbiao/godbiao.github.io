//百度统计
var _hmt = _hmt || [];
(function () {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?fa9dd4e58caec08d0c9ef7f4f34aab15";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
})();



$(document).ready(function () {
    $("#tips").fadeIn();
	if(isTpl()){
		tips();
	}
    
   //TIPS点击统计
    $(".tipsimg").click(function () {
        _hmt.push(["_trackEvent", "tips", "首页", this.alt]);

    });
});



function isMobile() {
    var ua = navigator.userAgent;
    var ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
        isIphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
        isAndroid = ua.match(/(Android)\s+([\d.]+)/),
        ismobile = isIphone || isAndroid;

    return ismobile;
}



//小技巧展示
function tips() {

    for (i in tipsdata) {

        var newtips = tipsdata[tipsdata.length - i - 1];
        if (newtips.isTips == "0") {
            continue;
        }
        var tips = '<div class="tips"><div class="tipsid">第-' + newtips.id + '-期</div><a href="' + newtips.url + '" title="' + newtips.title + '"><img class="tipsimg" alt="' + newtips.title + '" src="' + newtips.img + '" ></a><span class="tipstitle">' + newtips.title + '</span></div>';
        $("#tips-container").append(tips);
    }


 
}


//模板认定
function isTpl() {
    var herf = window.location.href;
    var flag = herf.substr(herf.indexOf('?') + 1, herf.length);
    if (flag == 1) {
        return true;
    } else {
        return false;
    }
}
