var title = "讯飞输入法Android版皮肤 - 1分钟400字,语音输入带你飞";

var s_len = skins.length;
var skinID = getskinid().id;

if (skinID) { //皮肤详情页
    itemSkin();
    ranRecommend();
    tips();
    likeskin();
} else if (isTpl()) { //首页模板
    indexSkin();
}


$(document).ready(function () {

    //banner打开微博
    $(".banner-weibo, .insstall-cont").click(function () {
        window.location.href = "http://m.weibo.cn/u/1136590322";
    });

    $(".ime-update").click(function () {
        window.location.href = "https://godbiao.github.io/update/beta.html";
    });

    //    //打开皮肤详情
    //    $(".skin-id").click(function () {
    //        var skinID = $(this).attr('id');
    //        if (isApp()) {
    //            window.location.href = "item.html?app=item&id=" + skinID;
    //        } else {
    //            window.location.href = "item.html?id=" + skinID;
    //        }
    //
    //    });

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

//下面是一些函数
//点赞
function likeskin() {

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
        $(".like span").html("&#xe66e;");
        //$(".like").addClass("liked");
    }

}

//皮肤详情页填充
function itemSkin() {
    for (var i = 0; i < s_len; i++) {
        if (skins[i].id == skinID) {
            var s = skins[i];
            skinInfo(s.name, s.author, s.size, s.description, s.update, s.star, s.type, s.time, s.imgs, s.it);
            putLables(s.lables[0], s.lables[1], s.lables[2], s.lables[3], s.lables[4], s.lables[5]);
            break;
        }
    };
}


//首页皮肤列表
function indexSkin() {
    for (var i = 0; i < s_len; i++) {
        var sid = skins[i].id;
        //首页隐藏一些皮肤
        if (skins[i].hide) {
            continue;
        }
        var sname = skins[i].name;
        var spreview = skins[i].imgs[0];
        var rowhot = '<div class="skin-id col-xs-4"><a href="item.html?id=' + sid + '" title="' + sname + '"><div class="thumbnail"><img src="' + spreview + '" class="skin-preview"><div class="caption"><div class="skin-name">' + sname + '</div></div></div></a></div>';
        var rownew = '<div class="skin-id col-xs-6"><a href="item.html?id=' + sid + '" title="' + sname + '"><div class="thumbnail"><img src="' + spreview + '" class="skin-preview"><div class="caption"><div class="skin-name">' + sname + '</div></div></div></a></div>';

        if (i > 3) {
            $("#row-hot").append(rowhot);
        } else {
            $("#row-new").append(rownew);
        }
    };
}

//随机推荐
function ranRecommend() {
    var ransid = getsid(s_len, 4);
    for (var i = 0; i < 3; i++) {
        var j = parseInt(ransid[i]);
        var sid = skins[j].id;
        if (sid == skinID) {
            j = parseInt(ransid[3]);
            sid = skins[j].id;
            var sname = skins[j].name;
            var spreview = skins[j].imgs[0];
            var rowmore = '<div class="skin-id col-xs-4"><a href="item.html?id=' + sid + '" title="' + sname + '"><div class="thumbnail"><img src="' + spreview + '" class="skin-preview"><div class="caption"><div class="skin-name">' + sname + '</div></div></div></a></div>';
            $("#row-more").append(rowmore);
            continue;
        }
        var sname = skins[j].name;
        var spreview = skins[j].imgs[0];
        var rowmore = '<div class="skin-id col-xs-4"><a href="item.html?id=' + sid + '" title="' + sname + '"><div class="thumbnail"><img src="' + spreview + '" class="skin-preview"><div class="caption"><div class="skin-name">' + sname + '</div></div></div></a></div>';
        $("#row-more").append(rowmore);
    };
}



//替换皮肤信息
function skinInfo(name, author, size, description, update, star, type, time, imgs, it) {
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

        $(".preview_9").attr("src", imgs[1]);
        //        $(".preview_26").hide();
        $(".skin-details-preview .item2").remove();
        $(".carousel-indicators").hide();
        $('.carousel').carousel({
            interval: 99999
        });

    } else {

        $(".preview_9").attr("src", imgs[1]);
        $(".preview_26").attr("src", imgs[2]);

    }

    //下载皮肤
    $(".skin-download").click(function () {
        if ($.cookie('installed') != 1) {

            $("#pop").show();
            $(".install,.iclose").slideDown(300);

            $(".pop-name").html('皮肤安装方法');
        }

        if (isIME()) {
            //跳转到IM追清风皮肤分类
            var imzqf = {
                cmd: 'open_client_detail_page',
                info: {
                    "client_page_type": "client_page_type_theme_classify_detail",
                    "client_page_title": "IM追清风",
                    "client_id": "7354",
                }
            };
            exec("imeExtendComponents", imzqf.cmd, imzqf.info);
            _hmt.push(["_trackEvent", "skins-ime", "download", name + "(" + skinID + ")"]);
        } else {
            //            window.location.href = "https://godbiao.github.io/skins/res/it/" + skinID + ".it";
            window.location.href = it;

            if (isApp()) {
                _hmt.push(["_trackEvent", "skins-app", "download", name + "(" + skinID + ")"]);
            } else {
                _hmt.push(["_trackEvent", "skins", "download", name + "(" + skinID + ")"]);
            }
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
    if (moren || primary || success || info || warning || danger) {
        $(".lables").show();
    }

    if (moren) {
        $(".lables").append('<span class="label label-default">' + moren + '</span>');
    }

    if (primary) {
        $(".lables").append('<span class="label label-primary">' + primary + '</span>');
    }

    if (success) {
        $(".lables").append('<span class="label label-success">' + success + '</span>');
    }

    if (info) {
        $(".lables").append('<span class="label label-info">' + info + '</span>');
    }

    if (warning) {
        $(".lables").append('<span class="label label-warning">' + warning + '</span>');
    }

    if (danger) {
        $(".lables").append('<span class="label label-danger">' + danger + '</span>');
    }
}


//获取链接中皮肤ID
function getskinid() {
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

//输入法中间件检测
function isIME() {
    var ua = navigator.userAgent;
    return ua.indexOf('iflytek_mmp') >= 0;
}


//左右滑动切换
function touchSlidePreview(eid) {
    var startX, endX;
    var el = document.getElementById(eid);
    el.addEventListener("touchstart", touchStart, false);
    el.addEventListener("touchmove", touchMove, false);
    el.addEventListener("touchend", touchEnd, false);

    function touchStart(event) {
        var touch = event.touches[0];
        startX = touch.pageX;
    }

    function touchMove(event) {
        var touch = event.touches[0];
        endX = touch.pageX;

        //左滑
        if ((startX - endX) > 50) {
            $('.carousel').carousel('next');
        }

        //右滑
        if ((endX - startX) > 50) {
            $('.carousel').carousel('prev');
        }
    }

    function touchEnd(event) {

    }
}


//下拉刷新
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

//手机端判定
function isMobile() {
    var ua = navigator.userAgent;
    var ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
        isIphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
        isAndroid = ua.match(/(Android)\s+([\d.]+)/),
        ismobile = isIphone || isAndroid;

    return ismobile;
}


//小技巧
function tips() {
    var randomnumber = getsid(tipsdata.length, 1);
    var newtips = tipsdata[randomnumber];
    var tips = "<a target='_blank' href='" + newtips.url + "' title='" + newtips.title + "'><img class='tipsimg' src='" + newtips.img + "'></a>";
    $("#tips").append(tips);
    //TIPS点击统计
    $(".tipsimg").click(function () {
        _hmt.push(["_trackEvent", "skins", "tips", newtips.title]);
    });
}

//百度统计
var _hmt = _hmt || [];
(function () {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?fa9dd4e58caec08d0c9ef7f4f34aab15";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
})();


console.log("%c ->我这烂代码\n %c->就不要偷了吧~\n %c->我只是个菜鸟┭┮﹏┭┮", "color:red", "color:green", "color:blue");
console.log("关注我微博吧：http://www.weibo.com/522239219");
