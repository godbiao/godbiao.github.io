<!DOCTYPE html>
<html lang="zh-cn">

<head>
    <meta charset="UTF-8">
    <title>讯飞输入法音乐皮肤配置读取</title>
    <style>
        body {
            padding: 0;
            margin: 0;
            word-wrap: break-word;
            padding: 40px;
            color: white;
            background: #000;
        }
        
        .color {
            width: 100px;
        }

    </style>
</head>

<body>
    <?php 
	//echo $style->getIniValue('CAIDAN', 'CAIDAN_SET').'<br>';
	//$style->setIniValue('SRC', $space, 'Common');
 if(@$_POST['save']==1){
     include_once("function.php");
     include_once("class/SimpleIniIterator.php");
     
     include_once("save.php");  

     //echo "<pre>";
     //var_dump($style->getIniContent());         
     
	}
?>


    <form action="" method="post">
        功能键通用前景正常状态颜色：0x<input class="color" maxlength="6" type="text" name="funcColor">
        <br> 功能键通用前景按下状态颜色：0x<input class="color" maxlength="6" type="text" name="funcpColor">
        <br>
        <button name="save" value="1">保存</button>
    </form>

</body>

</html>
