$(document).ready(function () {

    //banner打开微博
    $(".banner-weibo").click(function () {
        window.location.href = "http://m.weibo.cn/u/1136590322";
    });

    //打开皮肤详情
    $(".skin-id").click(function () {
        var skinID = $(this).attr('id');
        window.location.href = "item.html?id=" + skinID;

    });

    //功能未开发
    $(".unfinished").click(function () {
        alert("很抱歉，此功能尚未开发完成！");
    });

    $(".back").click(function () {
        window.location.href = "index.html";
    });


    $(window).scroll(function () {
        if ($(window).scrollTop() > 20) {
            $(".nomore,.split").removeClass("none");
        }
    });



});


var title = "讯飞输入法Android版皮肤 - 1分钟400字,语音输入带你飞";

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
for (var i = 0; i < s_len; i++) {
    var sid = skins[i].id;
    var sname = skins[i].name;
    var spreview = "res/it/" + sid + "_preview.jpg";
    var rowhot = '<div id="' + sid + '" class="skin-id col-xs-4"><div class="thumbnail"><img src="' + spreview + '" class="skin-preview "><div class="caption"><div class="skin-name">' + sname + '</div></div></div></div>';
    var rownew = '<div id="' + sid + '" class="skin-id col-xs-6"><div class="thumbnail"><img src="' + spreview + '" class="skin-preview "><div class="caption"><div class="skin-name">' + sname + '</div></div></div></div>';

    if (i > 3) {
        $("#row-hot").append(rowhot);
    } else {
        $("#row-new").append(rownew);
    }

};

//点赞逻辑
var likeTime = 0;
$(".like").click(function () {
    if ($.cookie(skinID) != 1) {
        $.cookie(skinID, 1, {
            expires: 365
        });
        $(this).html("已赞");
        $(this).addClass("liked");
		_czc.push(["_trackEvent", "skins", "like", $(".skin-name").html()+"("+skinID+")"]);
        alert("已赞");
    } else {
        if (likeTime >= 2) {
            alert("你到底想干哈？");
        } else {
            alert("已经赞过了");
        }
        likeTime++;
    }
});

if ($.cookie(skinID) == 1) {
    $(".like").html("已赞");
    $(".like").addClass("liked");
}


//下面是一些函数
//替换皮肤信息
function skinInfo(name, author, size, description, update, star, type, time) {
    $(".skin-name").html(name);
    $(".skin-author").html(author);
    $(".skin-size").html(size);
    $(".skin-time").html(time);
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

    $(".skin-description-content").html(description);
    if (update) {
        $(".skin-description-title").removeClass("none");
        $(".skin-description-update").removeClass("none");
        $(".skin-description-update").html(update);
    }

    if (type == "gif") {
        //预览图
        $(".preview_9").attr("src", "res/it/" + skinID + ".gif");
        $(".preview_26").hide();
    } else {
        //预览图切换	
        $(".preview").click(function () {
            $(this).addClass("none").siblings().removeClass("none");
        });
        //预览图
        if (type == "png") {
            $(".preview_9").attr("src", "res/it/" + skinID + "_9.png");
            $(".preview_26").attr("src", "res/it/" + skinID + "_26.png");
        } else {
            $(".preview_9").attr("src", "res/it/" + skinID + "_9.jpg");
            $(".preview_26").attr("src", "res/it/" + skinID + "_26.jpg");
        }

    }


    //下载皮肤
    $(".skin-download").click(function () {
        window.location.href = "res/it/" + skinID + ".it";
		_czc.push(["_trackEvent", "skins", "download", name+"("+skinID+")"]);
    });

    //全局标题
    $("title").html(name + " - " + author + " - " + title);
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
