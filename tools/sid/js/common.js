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

//添加class
//e:对象ID,c:需要添加的class
function myAddClass(e, c) {
    //获取对象
    var e = document.getElementById(e);
    //获取对象的当前class属性
    var cuclass = e.getAttribute("class");
    //添加class
    e.setAttribute("class", cuclass + " " + c);
}





function showID(key) {
    var key = $(key);
    key.mouseover(function () {
        $("#popup").hide();
        var sid = $(this).attr("sid");
        $(this).html(sid);
        if (sid == "1119") {
            $("#popup").show().html("1119(回车),1120(前往),1121(完成),1122(下个),1123(搜索),1124(清除),1245(发送)");
        }
        if (sid == "1116") {
            $("#popup").show().html("1116(ab),1117(分词)");
        }

        if (sid == "1110") {
            $("#popup").show().html("1110(符号),1111(逗号)");
        }

        if (sid == "1113") {
            $("#popup").show().html("1113(中英),1114(句号),1157(英中)");
        }

    });

    key.mouseout(function () {
        var title = $(this).attr("title");
        $(this).html(title);

    });
}


$(document).ready(function () {

    showID(".icon");
    showID(".key");
    showID(".func");
});
