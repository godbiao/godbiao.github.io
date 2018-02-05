//百度统计
var _hmt = _hmt || [];
(function () {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?fa9dd4e58caec08d0c9ef7f4f34aab15";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
})();

$("#index,#item").fadeIn();

var title = "讯飞输入法Android版皮肤 - 1分钟400字,语音输入带你飞";

var s_len = skins.length;
var skinID = getskinid().id;
var url = window.location.href;
if (skinID) { //皮肤详情页
    itemSkin();
    ranRecommend();
    tips();
    likeskin();
} else if (isTpl()) { //首页模板
    indexSkin();
} else {
    //首页浏览日志
    if (isApp()) {
        _hmt.push(["_trackEvent", "index-pv", "APP", url]);
    } else if (isQQ()) {
        _hmt.push(["_trackEvent", "index-pv", "QQ", url]);
    } else if (isWeiXin()) {
        _hmt.push(["_trackEvent", "index-pv", "WeiXin", url]);
    } else if (isWeiBo()) {
        _hmt.push(["_trackEvent", "index-pv", "Weibo", url]);
    } else if (isIME()) {
        _hmt.push(["_trackEvent", "index-pv", "IME", url]);
    } else {
        _hmt.push(["_trackEvent", "index-pv", "Others", url]);
    }
}


$(document).ready(function () {

    //banner打开微博
    $(".banner-weibo, .insstall-cont").click(function () {
        window.location.href = "http://m.weibo.cn/u/1136590322";
    });

    $(".ime-update").click(function () {
        window.location.href = "https://godbiao.github.io/update/beta.html";
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
    var msg = ["呵呵", "^_^你已坚定地赞过!", "_^后悔点赞了么？", "^_后悔也没用了呀~", "^V^其实是我太懒没加取消点赞功能~", "^:^悲催鸟,要跳转到我微博了……"];
    var likeTime = 1;

    $(".like").click(function () {
        if ($.cookie(skinID) != 1) {
            $.cookie(skinID, 1, {
                expires: 365
            });
            $(this).html("&#xe66e;");
            $(this).addClass("liked");

            _hmt.push(["_trackEvent", "skins", "like", $(".skin-name").html() + "(" + skinID + ")"]);

        } else {

            if (likeTime > 4) {
                if (isApp()) {
                    app.toast(msg[5]);
                } else {
                    alert(msg[5]);
                }
                window.location.href = "http://m.weibo.cn/u/1136590322";
            } else {
                if (isApp()) {
                    app.toast(msg[likeTime]);
                } else {
                    alert(msg[likeTime]);
                }
            }

            likeTime++;
        }
    });

    if ($.cookie(skinID) == 1) {
        $(".like span").html("&#xe66e;");
    }

}

//皮肤详情页填充
function itemSkin() {
    for (var i = 0; i < s_len; i++) {
        if (skins[i].id == skinID) {
            var s = skins[i];
            var l = s.lables;
            skinInfo(s);
            putLables(l);
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
        var rowhot = skin([4, sid, sname, spreview]);
        var rownew = skin([6, sid, sname, spreview]);

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
        //过滤
        if (sid == skinID) {
            j = parseInt(ransid[3]);
            sid = skins[j].id;
        }
        var sname = skins[j].name;
        var spreview = skins[j].imgs[0];
        var rowmore = skin([4, sid, sname, spreview]);
        $("#row-more").append(rowmore);
    };
}

//4-6;sid;sname
function skin(s) {
    return '<div class="skin-id col-xs-' + s[0] + '"><a href="item.html?id=' + s[1] + '" title="' + s[2] + '"><div class="thumbnail"><img src="' + s[3] + '" class="skin-preview"><div class="caption"><div class="skin-name">' + s[2] + '</div></div></div></a></div>';

}

//替换皮肤信息
function skinInfo(s) {
    var name = s.name;
    var author = s.author;
    var size = s.size;
    var time = s.time;
    var star = s.star;
    var description = s.description;
    var update = s.update;
    var imgs = s.imgs;
    var it = s.it;
    var beta = s.beta;
    var type = s.type;
    var rid = s.rid;

    $(".skin-name").html(name);
    $(".skin-author").html(author);
    $(".skin-size").html(size);
    $(".skin-time").html(time);

    $(".skin-star").empty();
    for (var i = 0; i < star; i++) {
        $(".skin-star").append("★");
    }
    for (var i = 0; i < 5 - star; i++) {
        $(".skin-star").append("☆");
    }

    //描述和升级
    $(".skin-description-content").html(description);
    if (update) {
        $("#skin-description-update").show();
        $(".skin-description-update").html(update);
    }

    //详情图
    if (type == "gif") {

        $(".preview_9").attr("src", imgs[1]);
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
        if (isIME() || isQQ() || isWeiXin()) {
            $.cookie('installed', 1, {
                expires: 365
            });
        }
        if ($.cookie('installed') != 1) {

            $("#pop").show();
            $(".install,.iclose").slideDown(300);

            $(".pop-name").html('皮肤安装方法');
        }

        if (isIME()) {
            //跳转到皮肤详情
            /* var myskin = {
                cmd: 'open_client_detail_page',
                info: {
                "client_page_type": "client_page_type_theme_detail",
                 "client_id": skinID,
                }
            };*/

            //直接下载皮肤
            var myskin = {
                cmd: 'open_download',
                info: {
                    "download_res_type": "download_res_type_theme",
                    "download_res_title": name,
                    "download_res_size": size,
                    "download_res_id": skinID,
                    "download_res_url": "https://godbiao.github.io/skins/" + it
                }
            };
            exec("imeExtendComponents", myskin.cmd, myskin.info);


        } else if (isQQ() || isWeiXin()) {

            if (beta) {
                window.location.href = it;
            } else {
                window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.iflytek.inputmethod&ckey=CK1373472118157&android_schema=open%3a%2f%2finputmethod.iflytek.com%2f7424%2f" + skinID;
            }

        } else {
            window.location.href = it;
        }
        //下载日志
        if (isApp()) {
            _hmt.push(["_trackEvent", "download", "APP", name + "(" + skinID + ")"]);
        } else if (isQQ()) {
            _hmt.push(["_trackEvent", "download", "QQ", name + "(" + skinID + ")"]);
        } else if (isWeiXin()) {
            _hmt.push(["_trackEvent", "download", "WeiXin", name + "(" + skinID + ")"]);
        } else if (isWeiBo()) {
            _hmt.push(["_trackEvent", "download", "Weibo", name + "(" + skinID + ")"]);
        } else if (isIME()) {
            _hmt.push(["_trackEvent", "download", "IME", name + "(" + skinID + ")"]);
            if (rid) {
                $.ajax({
                    url: 'http://log.voicecloud.cn/resredirect?gid=7&cid=7606&rid=' + rid + '&a=download&uid=0&imei=00&cv=' + getClientVersion() + '&df=0&biz=100IME&os=android&ap=wifi',
                    async: true
                });
            }
        } else {
            _hmt.push(["_trackEvent", "download", "Others", name + "(" + skinID + ")"]);
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

    //详情页浏览日志
    if (isApp()) {
        _hmt.push(["_trackEvent", "item-pv", "APP", name + "(" + skinID + ")"]);
    } else if (isQQ()) {
        _hmt.push(["_trackEvent", "item-pv", "QQ", name + "(" + skinID + ")"]);
    } else if (isWeiXin()) {
        _hmt.push(["_trackEvent", "item-pv", "WeiXin", name + "(" + skinID + ")"]);
    } else if (isWeiBo()) {
        _hmt.push(["_trackEvent", "item-pv", "Weibo", name + "(" + skinID + ")"]);
    } else if (isIME()) {
        _hmt.push(["_trackEvent", "item-pv", "IME", name + "(" + skinID + ")"]);
    } else {
        _hmt.push(["_trackEvent", "item-pv", "Others", name + "(" + skinID + ")"]);
    }

    //分享及帮助
    var win_share = '<img class="share-qq" src="res/share_ic_qq_friend.png" alt=""><img class="share-wxf" src="res/share_ic_wechat_friend.png" alt=""><img class="share-pyq" src="res/share_ic_time_line.png" alt=""><img class="share-wb" src="res/share_ic_weibo.png" alt=""><div class="clear">取消</div>';
    $('#share-win').html(win_share);

    if (isIME()) {
        $(".help").hide();
        $(".share").show();
        $(".share").click(function () {
            $(".shade").show();
            $("#share-win").slideToggle(200);
        });

        $(".share-qq").click(function () {
            exec("imeExtendComponents", 'share_qq', [name, description, url, imgs[0], imgs[1], {
                'sharesuccesspageUrl': 'https://godbiao.github.io/skins/index.html'
                }]);
            $(".shade").hide();
            $("#share-win").slideToggle(200);

            _hmt.push(["_trackEvent", "share", "share_QQ", name + "(" + skinID + ")"]);

        });

        $(".share-wxf").click(function () {

            exec("imeExtendComponents", 'share_mm_friend', [name, description, url, imgs[0], imgs[1], {
                'sharesuccesspageUrl': 'https://godbiao.github.io/skins/index.html'
                }]);
            $(".shade").hide();
            $("#share-win").slideToggle(200);

            _hmt.push(["_trackEvent", "share", "share_WeiXin_friend", name + "(" + skinID + ")"]);
        });

        $(".share-pyq").click(function () {

            exec("imeExtendComponents", 'share_mm', [name, description, url, imgs[0], imgs[1], {
                'sharesuccesspageUrl': 'https://godbiao.github.io/skins/index.html'
                }]);
            $(".shade").hide();
            $("#share-win").slideToggle(200);

            _hmt.push(["_trackEvent", "share", "share_WeiXin_pyq", name + "(" + skinID + ")"]);

        });

        $(".share-wb").click(function () {

            exec("imeExtendComponents", 'share_weibo', [name, description, url, imgs[0], imgs[1], {
                'sharesuccesspageUrl': 'https://godbiao.github.io/skins/index.html'
                }]);
            $(".shade").hide();
            $("#share-win").slideToggle(200);

            _hmt.push(["_trackEvent", "share", "share_weibo", name + "(" + skinID + ")"]);
        });

        $(".share-qzone").click(function () {

            exec("imeExtendComponents", 'share_qzone', [name, description, url, imgs[0], imgs[1], {
                'sharesuccesspageUrl': 'https://godbiao.github.io/skins/index.html'
                }]);
            $(".shade").hide();
            $("#share-win").slideToggle(200);

            _hmt.push(["_trackEvent", "share", "share_qzone", name + "(" + skinID + ")"]);
        });


    } else if (isWeiXin() || isQQ()) {
        $(".help").hide();
    } else {
        //帮助
        $(".help").click(function () {
            $("#pop").show();
            $(".install,.iclose").slideDown(300);

            $(".pop-name").html('皮肤安装方法');
        });
    }

    $(".shade, .clear").click(function () {
        $(".shade").hide();
        $("#share-win").slideToggle(200);
    });

}

//打标签
function putLables(l) {

    var labs = ["default", "primary", "success", "info", "warning", "danger"];

    if (l[0] || l[1] || l[2] || l[3] || l[4] || l[5]) {
        $(".lables").empty().show();
    }
    for (var i = 0; i < 6; i++) {
        if (l[i]) {
            $(".lables").append('<span class="label label-' + labs[i] + '">' + l[i] + '</span>');
        }
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

//获取客户端版本号
function getClientVersion() {
    var client_version = exec("imeExtendComponents", 'ask_client_version', []);
    var version = convertType(client_version).message;
    if (version) {
        return version;
    }
    return 0;
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


//小技巧展示
function tips() {
    var randomnumber = Math.floor(Math.random() * tipsdata.length);
    var newtips = tipsdata[randomnumber];
    var tips = '<a href="' + newtips.url + '" title="' + newtips.title + '"><img class="tipsimg" alt="' + newtips.title + '" src="' + newtips.img + '"></a>';
    $("#tips").append(tips);
    //TIPS点击统计
    $(".tipsimg").click(function () {
        //window.location.href = newtips.url;
        _hmt.push(["_trackEvent", "skins", "tips", newtips.title]);

    });
}

//判断是否在微信里打开
function isWeiXin() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;

    } else {
        return false;
    }
}

//判断是否在QQ里打开 
function isQQ() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/QQ/i) == 'qq') {
        return true;
    } else {
        return false;
    }
}

//判断是否在微博里打开
function isWeiBo() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/WeiBo/i) == 'weibo') {
        return true;
    } else {
        return false;
    }
}

//装x
console.log("%c ->我这烂代码\n %c->就不要偷了吧~\n %c->我只是个菜鸟┭┮﹏┭┮", "color:red", "color:green", "color:blue");
console.log("关注我微博吧：http://www.weibo.com/522239219");

/* 鼠标特效 
var a_idx = 0;
jQuery(document).ready(function ($) {
    $("body").click(function (e) {
        var a = new Array("富强", "民主", "文明", "和谐", "自由", "平等", "公正", "法治", "爱国", "敬业", "诚信", "友善");
        var $i = $("<span/>").text(a[a_idx]);
        a_idx = (a_idx + 1) % a.length;
        var x = e.pageX,
            y = e.pageY;
        $i.css({
            "z-index": 999999999999999999999999999999999999999999999999999999999999999999999,
            "top": y - 20,
            "left": x,
            "position": "absolute",
            "font-weight": "bold",
            "color": "#ff6651",
            "text-shadow": "0 5px 5px #ccc",
            "font-size": "16px"
        });
        $("body").append($i);
        $i.animate({
                "top": y - 180,
                "opacity": 0,

            },
            1500,
            function () {
                $i.remove();
            });
    });
});
*/
