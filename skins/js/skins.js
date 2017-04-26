//异步加载皮肤表
var skinsAjaxBackup = $.ajax({
    url: "skins.json",
    async: false
});
var skinsData = skinsAjaxBackup.responseText;
var skins = eval("(" + skinsData + ")");
