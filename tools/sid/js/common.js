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
			$("#popup").show();
			$("#popup").html("1119,1120,1121,1122,1123,1124,1245");
		}
		if (sid == "1116") {
			$("#popup").show();
			$("#popup").html("1116,1117");
		}

		if (sid == "1110") {
			$("#popup").show();
			$("#popup").html("1110,1111");
		}

		if (sid == "1113") {
			$("#popup").show();
			$("#popup").html("1114,1157");
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
