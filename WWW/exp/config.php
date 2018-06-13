<?php
$ip = 'tmp/'.$_SERVER["REMOTE_ADDR"];
$updir = $ip.'/up/';//定义表情主图上传目录
$updir_pre =$ip.'/up_pre/';//定义聊天面板图目录
if(file_exists($updir)){
$num = count(scandir($updir))-2;	
}

if($_POST){
    $name = $_POST['name'];
    $version = $_POST['version'];
    $description = $_POST['description'];
    $author =  $_POST['author'];
    //if(!$_POST['uid']){$uid = guid();}else{$uid=$_POST['uid'];}
    $uid = guid();
    $type = $_POST['type'];//表情类型
    
    include('ini.php');
}



?>
