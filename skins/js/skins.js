//异步加载皮肤表

//加载JSON皮肤
var skinsAjaxBackup = $.ajax({
    url: "skins.json",
    async: false
});

//获取皮肤文件内容
var skinsData = skinsAjaxBackup.responseText;

//转换为对象
var skins = eval("(" + skinsData + ")");
