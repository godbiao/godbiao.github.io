<?php
include('inc/function.php');
@include('config.php');

if(file_exists($ip)){
	deldir($updir);//删除表情主图目录下的文件及文件夹
	deldir($updir_pre);//删除聊天面板图目录下的文件及文件夹
  
}

createDir($updir);//创建表情目录
createDir($updir_pre);//创建聊天面板图目录

?>