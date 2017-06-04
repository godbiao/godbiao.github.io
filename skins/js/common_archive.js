$(document).ready(function () {

    $("body").fadeIn();

    if (!isApp()) {
        $("#banner").show();
    }

    //banner打开微博
    $(".banner-weibo, .insstall-cont").click(function () {
        window.location.href = "http://m.weibo.cn/u/1136590322";
    });

    $(".ime-update").click(function () {
        window.location.href = "https://godbiao.github.io/update/beta.html";
    });

    //打开皮肤详情
    $(".skin-id").click(function () {
        var skinID = $(this).attr('id');
        if (isApp()) {
            window.location.href = "item.html?app=item&id=" + skinID;
        } else {
            window.location.href = "item.html?id=" + skinID;
        }

    });

    //帮助
    $(".share").click(function () {
        $("#pop").show();
        $(".install,.iclose").slideDown(300);

        $(".pop-name").html('皮肤安装方法');
    });

    //返回
    $(".back").click(function () {
        window.location.href = "index.html";

    });

    //左右滑动详情图
    if ($("#carousel-skin-details-preview").length > 0) {
        touchSlidePreview("carousel-skin-details-preview");
    }

    //下拉刷新
    if (!isApp()) {
        touchSlideReload();
    }

});


var title = "讯飞输入法Android版皮肤 - 1分钟400字,语音输入带你飞";
if (isApp()) {
    $("title").html("终极皮肤");
}


//详情页面遍历ID进行匹配数据
var Request = new Object();
Request = GetRequest();
var skinID = Request['id'];
var s_len = skins.length;
for (var i = 0; i < s_len; i++) {
    if (skins[i].id == skinID) {
        var s = skins[i];
        skinInfo(s.name, s.author, s.size, s.description, s.update, s.star, s.type, s.time);
        putLables(s.lables[0], s.lables[1], s.lables[2], s.lables[3], s.lables[4], s.lables[5]);
        break;
    }
};

//首页皮肤列表
/*
for (var i = 0; i < s_len; i++) {
    var sid = skins[i].id;
    var sname = skins[i].name;
    var spreview = "https://godbiao.github.io/skins/res/it/" + sid + "_preview.jpg";
    var rowhot = '<div id="' + sid + '" class="skin-id col-xs-4"><a href="item.html?id=' + sid + '" title="' + sname + '"><div class="thumbnail"><img src="' + spreview + '" class="skin-preview "><div class="caption"><div class="skin-name">' + sname + '</div></div></div></a></div>';
    var rownew = '<div id="' + sid + '" class="skin-id col-xs-6"><a href="item.html?id=' + sid + '" title="' + sname + '"><div class="thumbnail"><img src="' + spreview + '" class="skin-preview "><div class="caption"><div class="skin-name">' + sname + '</div></div></div></a></div>';

    if (i > 3) {
        $("#row-hot").append(rowhot);
    } else {
        $("#row-new").append(rownew);
    }
}
*/

//随机推荐
var ransid = getsid(s_len, 4);
for (var i = 0; i < 3; i++) {
    var j = parseInt(ransid[i]);
    var sid = skins[j].id;
    if (sid == skinID) {
        j = parseInt(ransid[3]);
        sid = skins[j].id;
        var sname = skins[j].name;
        var spreview = "https://godbiao.github.io/skins/res/it/" + sid + "_preview.jpg";
        var rowmore = '<div id="' + sid + '" class="skin-id col-xs-4"><div class="thumbnail"><img src="' + spreview + '" class="skin-preview "><div class="caption"><div class="skin-name">' + sname + '</div></div></div></div>';
        $("#row-more").append(rowmore);
        continue;
    }
    var sname = skins[j].name;
    var spreview = "https://godbiao.github.io/skins/res/it/" + sid + "_preview.jpg";
    var rowmore = '<div id="' + sid + '" class="skin-id col-xs-4"><div class="thumbnail"><img src="' + spreview + '" class="skin-preview "><div class="caption"><div class="skin-name">' + sname + '</div></div></div></div>';
    $("#row-more").append(rowmore);
}


//点赞逻辑
var likeTime = 1;
$(".like").click(function () {
    if ($.cookie(skinID) != 1) {
        $.cookie(skinID, 1, {
            expires: 365
        });
        $(this).html("&#xe66e;");
        $(this).addClass("liked");
        if (isApp()) {
            _hmt.push(["_trackEvent", "skins-app", "like", $(".skin-name").html() + "(" + skinID + ")"]);
        } else {
            _hmt.push(["_trackEvent", "skins", "like", $(".skin-name").html() + "(" + skinID + ")"]);
        }


    } else {

        var msg = ["呵呵", "^_^你已坚定地赞过!", "_^后悔点赞了么？", "^_后悔也没用了呀~", "^V^其实是我太懒没加取消点赞功能~", "^:^悲催鸟,要跳转到我微博了……"];
        if (likeTime == 2) {

            if (isApp()) {
                app.toast(msg[2]);
            } else {
                alert(msg[2]);
            }

        } else if (likeTime == 3) {
            if (isApp()) {
                app.toast(msg[3]);
            } else {
                alert(msg[3]);
            }

        } else if (likeTime == 4) {
            if (isApp()) {
                app.toast(msg[4]);
            } else {
                alert(msg[4]);
            }
        } else if (likeTime > 4) {
            if (isApp()) {
                app.toast(msg[5]);
            } else {
                alert(msg[5]);
            }
            window.location.href = "http://m.weibo.cn/u/1136590322";
        } else {
            if (isApp()) {
                app.toast(msg[1]);
            } else {
                alert(msg[1]);
            }
        }
        likeTime++;
    }
});

if ($.cookie(skinID) == 1) {
    $(".like").html("&#xe66e;");
    //$(".like").addClass("liked");
}


//下面是一些函数
//替换皮肤信息
function skinInfo(name, author, size, description, update, star, type, time) {
    $(".skin-name").html(name);
    $(".skin-author").html(author);
    $(".skin-size").html(size);
    $(".skin-time").html(time);
    //评星
    switch (star) {
        case "5":
            $(".skin-star").html("★★★★★");
            break;
        case "4":
            $(".skin-star").html("★★★★☆");
            break;
        case "3":
            $(".skin-star").html("★★★☆☆");
            break;
        case "2":
            $(".skin-star").html("★★☆☆☆");
            break;
        case "1":
            $(".skin-star").html("★☆☆☆☆");
            break;
        default:
            $(".skin-star").html("☆☆☆☆☆");
            break;
    };

    //描述和升级
    $(".skin-description-content").html(description);
    if (update) {
        $(".skin-description-title").removeClass("none");
        $(".skin-description-update").removeClass("none");
        $(".skin-description-update").html(update);
    }

    //详情图
    if (type == "gif") {

        $(".preview_9").attr("src", "https://godbiao.github.io/skins/res/it/" + skinID + ".gif");
        $(".preview_26").hide();
        $(".carousel-indicators").hide();
        $('.carousel').carousel({
            interval: 99999
        });

    } else if (type == "png") {

        $(".preview_9").attr("src", "https://godbiao.github.io/skins/res/it/" + skinID + "_9.png");
        $(".preview_26").attr("src", "https://godbiao.github.io/skins/res/it/" + skinID + "_26.png");

    } else {

        $(".preview_9").attr("src", "https://godbiao.github.io/skins/res/it/" + skinID + "_9.jpg");
        $(".preview_26").attr("src", "https://godbiao.github.io/skins/res/it/" + skinID + "_26.jpg");

    }

    //下载皮肤
    $(".skin-download").click(function () {
        if ($.cookie('installed') != 1) {

            $("#pop").show();
            $(".install,.iclose").slideDown(300);

            $(".pop-name").html('皮肤安装方法');
        }

        window.location.href = "https://godbiao.github.io/skins/res/it/" + skinID + ".it";
        if (isApp()) {
            _hmt.push(["_trackEvent", "skins-app", "download", name + "(" + skinID + ")"]);
        } else {
            _hmt.push(["_trackEvent", "skins", "download", name + "(" + skinID + ")"]);
        }

    });

    $("#pop").click(function () {
        $("#pop").fadeOut(300);
        $(".install,.iclose").slideUp(200);

        $(".pop-name").html(name);
        $.cookie('installed', 1, {
            expires: 365
        });
    });

    if (isApp()) {
        $("title").html(name);
        $(".top-title").hide();
        $("#item").css({
            "padding-top": "0px"
        });
        $(".skin-sas").css({
            "padding-top": "12px"
        });
    } else {
        $("title").html(name + " - " + author + " - " + title);
    }


}


//打标签
function putLables(moren, primary, success, info, warning, danger) {
    if (moren !== "" || primary !== "" || success !== "" || info !== "" || warning !== "" || danger !== "") {
        $(".lables").removeClass("none");
    }

    if (moren !== "") {
        $(".label-default").removeClass("none").html(moren);
    }

    if (primary !== "") {
        $(".label-primary").removeClass("none").html(primary);
    }

    if (success !== "") {
        $(".label-success").removeClass("none").html(success);
    }

    if (info !== "") {
        $(".label-info").removeClass("none").html(info);
    }

    if (warning !== "") {
        $(".label-warning").removeClass("none").html(warning);
    }

    if (danger !== "") {
        $(".label-danger").removeClass("none").html(danger);
    }
}


//获取皮肤ID
function GetRequest() {
    var url = location.search;
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}

//获取随机数
function getsid(sum, num) {
    var a = [];
    for (var i = 0; i < sum; i++) {
        a.push(i);
    }
    a.sort(function () {
        return 0.5 - Math.random()
    });
    a.length = num;
    return a;
}

//运行环境检测
function isApp() {
    var ua = navigator.userAgent;
    return ua.indexOf('Godbiao') >= 0;
}


//左右滑动
function touchSlidePreview(e) {
    var startX, startY, endX, endY;
    var el = document.getElementById(e);
    el.addEventListener("touchstart", touchStart, false);
    el.addEventListener("touchmove", touchMove, false);
    el.addEventListener("touchend", touchEnd, false);

    function touchStart(event) {
        var touch = event.touches[0];
        //        startY = touch.pageY;
        startX = touch.pageX;
    }

    function touchMove(event) {
        var touch = event.touches[0];
        //endY = (startY - touch.pageY);
        endX = touch.pageX;
    }

    function touchEnd(event) {
        //左滑
        if ((startX - endX) > 100) {
            $('.carousel').carousel('next');

        }

        //右滑
        if ((endX - startX) > 100) {
            $('.carousel').carousel('prev');

        }

    }
}

//下拉
function touchSlideReload() {
    var startY, endY;
    window.addEventListener("touchstart", touchStart, false);
    window.addEventListener("touchmove", touchMove, false);
    window.addEventListener("touchend", touchEnd, false);

    function touchStart(event) {
        var touch = event.touches[0];
        startY = touch.pageY;
        $("body").css({
            "padding-top": 0,
            "transition": "0s"
        });
        $(".navbar-fixed-top").css({
            "top": 0,
            "transition": "0s"
        });
    }

    function touchMove(event) {
        var touch = event.touches[0];

        endY = (touch.pageY - startY) - 50;
        if (endY > 0) {
            $("body").css("padding-top", endY);
            $(".navbar-fixed-top").css({
                "position": "absolute",
                "top": endY,
            });
            //            $("body").css('transform', 'translateY(' + endY + 'px)');
        }


    }

    function touchEnd(event) {

        $("body").css({
            "padding-top": 0,
            "transition": ".5s ease"
        });
        $(".navbar-fixed-top").css({
            "position": "fixed",
            "top": 0,
            "transition": ".4s ease"
        });
        //左滑
        if (endY > 120 && $(document).scrollTop() < 10) {
            window.location = location.href;
        }


    }
}
