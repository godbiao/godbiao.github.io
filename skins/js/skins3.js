//异步加载皮肤表

//JQ加载JSON皮肤
/*var skinsAjax = $.ajax({
    url: "https://godbiao.github.io/skins/skins.json",
    async: false
});
*/
//原生加载JSON皮肤
var skinsAjax = new XMLHttpRequest();
skinsAjax.open('GET', 'https://godbiao.github.io/skins/skins.json', false);
skinsAjax.send();

//获取皮肤文件内容
var skinsData = skinsAjax.responseText;

//转换为对象
var skins = eval("(" + skinsData + ")");
