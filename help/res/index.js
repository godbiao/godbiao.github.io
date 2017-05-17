//事件统计
var _czc = _czc || [];
_czc.push(["_setAccount", "2604584"]);

if (isApp() && isNew()) {
    //显示版本号
    $(".client-version").html("V" + getClientVersion());

    //关闭窗口
    $(".close-window").show().click(function () {
        exec("imeExtendComponents", "close_window", []);
    });
}


//获取客户端版本号
function getClientVersion() {
    var client_version = exec("imeExtendComponents", 'ask_client_version', []);
    var version = convertType(client_version).message;
    if (version) {
        return version;
    }
    return false;
}

//运行环境检测
function isApp() {
    var ua = navigator.userAgent;
    return ua.indexOf('iflytek_mmp') >= 0;
}

//是否支持新功能
function isNew() {
    if (getClientVersion()) {
        var current_client_version = getClientVersion().substr(4, 4);
        return parseInt(current_client_version) >= 4851;
    }
    return false;
}


$(document).ready(function () {

    $("body").css({
        "background-color": "#f3f3f3"
    }).fadeIn();

    //logo点击
    $(".logo").click(function () {
        //检查更新
        exec("imeExtendComponents", "click_update");

    });

    //目录平滑停转
    $(".mulu-tesegongneng").click(function () {
        scrollID("#tesegongneng");
    });

    $(".mulu-bianjiekepu,.mulu-bianjieshuru").click(function () {
        scrollID("#bianjiekepu");
    });

    $(".mulu-fuzhugongneng").click(function () {
        scrollID("#fuzhugongneng");
    });

    $(".mulu-changjianwenti").click(function () {
        scrollID("#changjianwenti");
    });

    $(".back-top").click(function () {
        scrollID("#mulu");
    });

    function scrollID(id) {
        $("html,body").animate({
            scrollTop: $(id).offset().top
        }, 500);
    }

    //普通话识别
    $(".try-mandarin").click(function () {
        //跳转
        window.location = "https://s1.voicecloud.cn/activity/imeVoiceGuide3/index.html";
        //统计
        _czc.push(["_trackEvent", '使用帮助', '体验', '普通话识别']);
    });


    //音乐皮肤
    $(".try-skin-music").click(function () {
        //跳转到音乐皮肤分类
        var trySkinMusic = {
            lab: '音乐皮肤',
            cmd: 'open_client_detail_page',
            info: {
                "client_page_type": "client_page_type_theme_classify_detail",
                "client_page_title": "音乐皮肤",
                "client_id": "7154",
            }
        };
        exec("imeExtendComponents", trySkinMusic.cmd, trySkinMusic.info);
        //统计
        _czc.push(["_trackEvent", '使用帮助', '体验', '音乐皮肤']);
    });

    //动态皮肤
    $(".try-skin-dynamic").click(function () {
        //跳转到动态皮肤分类
        var trySkinDynamic = {
            lab: '动态皮肤',
            cmd: 'open_client_detail_page',
            info: {
                "client_page_type": "client_page_type_theme_classify_detail",
                "client_page_title": "动态皮肤",
                "client_id": "7255",
            }
        };
        exec("imeExtendComponents", trySkinDynamic.cmd, trySkinDynamic.info);
        //统计
        _czc.push(["_trackEvent", '使用帮助', '体验', '动态皮肤']);
    });

    //动画皮肤
    $(".try-skin-animation").click(function () {
        //跳转到动画皮肤分类
        var trySkinAnimation = {
            lab: '动画皮肤',
            cmd: 'open_client_detail_page',
            info: {
                "client_page_type": "client_page_type_theme_classify_detail",
                "client_page_title": "动画皮肤",
                "client_id": "7433",
            }
        };
        exec("imeExtendComponents", trySkinAnimation.cmd, trySkinAnimation.info);
        //统计
        _czc.push(["_trackEvent", '使用帮助', '体验', '动画皮肤']);
    });

    //百变皮肤
    $(".try-skin-carousel").click(function () {
        //跳转到百变皮肤分类
        var trySkinCarousel = {
            lab: '百变皮肤',
            cmd: 'open_client_detail_page',
            info: {
                "client_page_type": "client_page_type_theme_classify_detail",
                "client_page_title": "百变皮肤",
                "client_id": "7275",
            }
        };
        exec("imeExtendComponents", trySkinCarousel.cmd, trySkinCarousel.info);
        //统计
        _czc.push(["_trackEvent", '使用帮助', '体验', '百变皮肤']);
    });

    //斗图
    $(".try-doutu").click(function () {
        //跳转到斗图
        var trySkinDoutu = {
            lab: '斗图',
            cmd: 'openClientTabPage',
            info: [13315],
        };
        exec("imeExtendComponents", trySkinDoutu.cmd, trySkinDoutu.info);
        //统计
        _czc.push(["_trackEvent", '使用帮助', '体验', '斗图']);
    });


    //打开QQ群
    $(".qq-group").click(function () {
        exec("imeExtendComponents", "open_qq_group", ["打开输入法官方qq群"]);
    });

    //打开官方微信
    $(".weixin").click(function () {
        exec("imeExtendComponents", "open_mm_group", ["打开输入法官方微信账号"])
    });


    //清广告
    $(".try-clear-ad").click(function () {
        //显示弹窗
        $(".shade").show();
        $(".win-ad").show(300);

    });

    $(".win-ad li,.shade").click(function () {
        $(".shade").hide();
        $(".win-ad").hide(300);
    });

    $(".win-ad .win-yes").click(function () {
        //清广告
        exec("imeExtendComponents", "click_clear_ad");
        alert("广告已清理");
    });

});
