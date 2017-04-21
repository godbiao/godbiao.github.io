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
        
        .section {
            color: red;
        }
        
        .attr {
            color: blue;
        }
        
        .value {
            color: forestgreen;
        }

    </style>
</head>

<body>
    <?php
include_once("function.php");
include_once("SimpleIniIterator.php");

//读取彩蛋文件
/*
$caiDan = parse_ini_file("caidan.ini",true);
$sound = parse_ini_file("sound.ini",true);
print_r(json_encode($caiDan,JSON_UNESCAPED_UNICODE));
echo "<h3>按键音效</h3>";
show_ini($sound);
echo "<h3>彩蛋音效</h3>";
show_ini($caiDan);
*/

	$content = new SimpleIniIterator('ini/sound.ini');
	 
	//print_r($content->getIniContent());
 
    $common = $content->getIniValue('Common', 'SRC');
    $space = $content->getIniValue('Space', 'SRC');
    echo "通用键：<audio src='ini/res/$common' controls></audio>
    <br>
    <br>
   空格键：<audio src='ini/res/$space' controls></audio> 
    ";
    
	//echo $content->getIniValue('CAIDAN', 'CAIDAN_SET').'<br>';
	$content->setIniValue('SRC', $space, 'Common');
  echo "<br>";
 echo "通用键：<audio src='ini/res/$common' controls></audio>
    <br>
    <br>
   空格键：<audio src='ini/res/$space' controls></audio> 
    ";
?>
</body>

</html>
