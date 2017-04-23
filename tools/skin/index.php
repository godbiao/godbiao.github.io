<!DOCTYPE html>
<html lang="zh-cn">

<head>
    <meta charset="UTF-8">
    <title>讯飞输入法皮肤STYLE配置工具</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <?php
    include("class/SimpleIniIterator.php"); 
    include("function.php");
    include("config.php");
    if($_POST){
        include("save.php");    
    }else{
        $style = new SimpleIniIterator(INIDIR);
        $funcColor = substr($style->getIniValue('602', 'NM_Color'),2);
        $funcpColor = substr($style->getIniValue('602', 'PS_Color'),2);
        $keyColor = substr($style->getIniValue('605', 'NM_Color'),2);
        $keypColor = substr($style->getIniValue('605', 'PS_Color'),2);
        
        $style = '';
    }
    ?>
        <div class="main">
            <form action="" method="post">
                <ul class="list">
                    <li>
                        <span>功能键通用前景正常状态颜色: 0x</span>
                        <span><input class="color" maxlength="6" type="text" name="funcColor" value="<?php echo $funcColor; ?>"></span></li>
                    <li>
                        <span>功能键通用前景按下状态颜色: 0x</span>
                        <span><input class="color" maxlength="6" type="text" name="funcpColor" value="<?php echo $funcpColor; ?>"></span></li>
                    <li>
                        <span>普通键通用前景正常状态颜色: 0x</span>
                        <span><input class="color" maxlength="6" type="text" name="keyColor" value="<?php echo $keyColor; ?>"></span></li>
                    <li>
                        <span>普通键通用前景按下状态颜色: 0x</span>
                        <span><input class="color" maxlength="6" type="text" name="keypColor" value="<?php echo $keypColor; ?>"></span></li>
                </ul>
                <div>
                    <button class="save" name="save">保存</button>
                </div>
            </form>
        </div>
</body>

</html>
