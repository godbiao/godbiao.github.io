<?php
$ip = 'tmp/'.$_SERVER["REMOTE_ADDR"];
$updir = $ip.'/up/';//定义表情主图上传目录
$updir_pre =$ip.'/up_pre/';//定义聊天面板图目录
if(file_exists($updir)){
$num = count(scandir($updir))-2;	
}
$name = $_POST['name'];
$version = $_POST['version'];
$description = $_POST['description'];
$author =  $_POST['author'];
//if(!$_POST['uid']){$uid = guid();}else{$uid=$_POST['uid'];}
$uid = guid();
$type = $_POST['type'];//表情类型
switch($type){
	case 'dynamic':
	$_EXPRESSION_TYPE_QQ = "7";//QQGIF类型
    $_EXPRESSION_TYPE_WX = "6"; //微信GIF类型
	$num= $num/2;//动态表情数量
	break;
	case 'static':
	$_EXPRESSION_TYPE_QQ = "5";//QQPNG类型
    $_EXPRESSION_TYPE_WX = "1"; //微信PNG类型
	break;
};

$_EXPRESSION_SIZE_V = "3x3"; //竖屏排列
$_EXPRESSION_SIZE_L= "3x4";//横屏排列
$_EXPRESSION_CHILDREN = "";
for ($i=1; $i<=$num; $i++) {
	if($i==$num){
		$_EXPRESSION_CHILDREN =$_EXPRESSION_CHILDREN.'Expression_'.$i;
	}else{
		$_EXPRESSION_CHILDREN =$_EXPRESSION_CHILDREN.'Expression_'.$i.',';
	} 
}

$qq_expression = array(		
				'EXPRESSION' => array(
                    'TYPE' => $_EXPRESSION_TYPE_QQ,
                    'SIZE' => $_EXPRESSION_SIZE_V,
                    'CHILDREN' => $_EXPRESSION_CHILDREN,
                ));

if($type=='dynamic'){
	for ($i=1; $i<=$num; $i++) {
			$qq_expression['Expression_'.$i] = array(
                    'TITLE'=> $i,
                    'MAPPING' => $i,
                    'SRC' => $i,
					'PREVIEW_IMAGE' => 'preview_'.$i,
				); 
}
}else{
	for ($i=1; $i<=$num; $i++) {
			$qq_expression['Expression_'.$i] = array(
                    'TITLE'=> $i,
                    'MAPPING' => $i,
                    'SRC' => $i,                   
				); 
  }
}

				
$qq_expression_land = array(		
				'EXPRESSION' => array(
                    'TYPE' => $_EXPRESSION_TYPE_QQ,
                    'SIZE' => $_EXPRESSION_SIZE_L,
                    'CHILDREN' => $_EXPRESSION_CHILDREN,
                ));	

$wx_expression = array(		
				'EXPRESSION' => array(
                    'TYPE' => $_EXPRESSION_TYPE_WX,
                    'SIZE' => $_EXPRESSION_SIZE_V,
                    'CHILDREN' => $_EXPRESSION_CHILDREN,
                ));		

$wx_expression_land = array(		
				'EXPRESSION' => array(
                    'TYPE' => $_EXPRESSION_TYPE_WX,
                    'SIZE' => $_EXPRESSION_SIZE_L,
                    'CHILDREN' => $_EXPRESSION_CHILDREN,
                ));		
	
$info = array(
                'INFO' => array(
                    'PLATFORM' => 'android',
                    'VERSION' => $version,
                    'NAME' => $name,
                    'AUTHOR' => $author,                
                    'PREVIEW' => 'preview',                
                    'ID' => $uid,                
                    'BASE' => 'templet',                
                    'CONTENT' => 'templet,templet_mm',                
                    'DESCRIPTION' => $description,                
                ),
                'templet' => array(
                    'NAME' => $name,
                    'DIR' => 'templet', 
                    'SUPPORT' => 'com.tencent.mobileqq',
                    'SUPPORT_VERSION_MIN' => '60',                    
				),				
				'templet_mm' => array(
                    'NAME' => $name,
                    'DIR' => 'templet_mm', 
                    'SUPPORT' => 'com.tencent.mm',
                    'SUPPORT_VERSION_MIN' => '0',      
                ));

include('inc/getpinyin.php');//中文转拼音
$expname =get_pinyin($name).date(m);//导出的表情包包名转为表情名称的拼音

$exportPath = $ip.'/'.$expname;//设置需要打包的目录
$filename = $exportPath.".exp";//设置压缩包的文件名

$expdir = $ip.'/'.$expname.'/'.$expname;//设置表情根目录
$qqdir = $expdir.'/templet/layout/'; //以下为表情各配置文件目录
$qqdir_land = $expdir.'/templet/layout_land/';
$qqres = $expdir.'/templet/res/';
$wxdir = $expdir.'/templet_mm/layout/';
$wxdir_land = $expdir.'/templet_mm/layout_land/';


?>
