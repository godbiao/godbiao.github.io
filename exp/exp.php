<?php

include('inc/function.php');//引入函数
include('config.php');//获取配置文件

createDir($qqdir);//创建目录
createDir($qqdir_land);//创建目录
createDir($qqres);//创建目录
createDir($wxdir);//创建目录
createDir($wxdir_land);//创建目录
write_ini_file($qq_expression, $qqdir.'expression.ini', true); 
write_ini_file($qq_expression_land, $qqdir_land.'expression.ini', true);
write_ini_file($wx_expression, $wxdir.'expression.ini', true);
write_ini_file($wx_expression_land, $wxdir_land.'expression.ini', true);
write_ini_file($info,$expdir.'/info.ini', true);
recurse_copy($updir,$qqres);
recurse_copy($updir_pre,$expdir);

include('pack.php');//开始打包并下载

unlink($filename);//删除表情包文件
delDir($exportPath);//删除表情目录


?>
