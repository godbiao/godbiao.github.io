<?php

$ip = 'tmp/'.$_SERVER["REMOTE_ADDR"];

$updir = $ip.'/up/';//定义表情主图上传目录
$updir_pre = $ip.'/up_pre/';//定义聊天面板图目录

if (isset($_FILES["Filedata"]) || !is_uploaded_file($_FILES["Filedata"]["tmp_name"]) || $_FILES["Filedata"]["error"] != 0) { 
    $upload_file = $_FILES['Filedata']; 
    $file_info   = pathinfo($upload_file['name']); 
    $file_type   = $file_info['extension']; 
    //$save        = $updir_pre . $_FILES["Filedata"]['name']; 
    $save        = $updir_pre . 'preview.png';//固定文件名preview.png
    $name        = $_FILES['Filedata']['tmp_name']; 
  
    if (!move_uploaded_file($name, $save)) { 
        exit; 
    }
  
    //将数组的输出存起来以供查看 
    $fileName = 'log.txt'; 
    $postData = var_export($file_info, true); 
    $file     = fopen('' . $fileName, "w"); 
    fwrite($file,$postData); 
    fclose($file); 
}
?>
