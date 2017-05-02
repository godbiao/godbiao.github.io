//事件统计
var _czc = _czc || [];
_czc.push(["_setAccount", "2604584"]);

$(document).ready(function () {
    //页面适应
    zoomBody(360);
    //logo点击
    $(".logo").click(function () {
        //检查更新
        exec("imeExtendComponents", "click_update");
        //window.location = "https://www.xunfei.cn";
    });

    //普通话识别
    $(".try-mandarin").click(function () {
        //跳转
        //统计
        _czc.push(["_trackEvent", '使用帮助', '体验', '普通话识别']);
    });

    //方言识别
    $(".try-dialect").click(function () {
        //跳转
        //统计
        _czc.push(["_trackEvent", '使用帮助', '体验', '方言识别']);
    });

    //随声译
    $(".try-translate").click(function () {
        //跳转
        //统计
        _czc.push(["_trackEvent", '使用帮助', '体验', '随声译']);
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

/*网页缩放
@s:设计分辨率
*/
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
