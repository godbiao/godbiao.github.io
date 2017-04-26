//皮肤数据表

var skinsAjax = $.ajax({
    url: "http://godbiao.iok.la/skins/skins.php",
    async: false
});


if (skinsAjax.status == 0 || skinsAjax.status == 404) {
    var skinsAjaxBackup = $.ajax({
        url: "skins.json",
        async: false
    });
    var skinsData = skinsAjaxBackup.responseText;

} else {
    //console.log(skinsAjax);
    var skinsData = skinsAjax.responseText;
}

var skins = eval("(" + skinsData + ")");
