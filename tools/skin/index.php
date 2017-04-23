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
        $iconColor = substr($style->getIniValue('612', 'NM_Color'),2);
        $iconpColor = substr($style->getIniValue('612', 'PS_Color'),2);
        $candColor = substr($style->getIniValue('614', 'NM_Color'),2);
        $candpColor = substr($style->getIniValue('614', 'PS_Color'),2);
        $candfColor = substr($style->getIniValue('614', 'FS_Color'),2);
        
        $style = '';
    }
    ?>
        <div class="main">
            <form action="" method="post">
                <ul class="list">
                    <li>
                        <span>功能键通用前景正常颜色: 0x</span>
                        <span><input class="color" maxlength="6" type="text" name="funcColor" value="<?php echo $funcColor; ?>"></span>
                    </li>
                    <li>
                        <span>功能键通用前景按下颜色: 0x</span>
                        <span><input class="color" maxlength="6" type="text" name="funcpColor" value="<?php echo $funcpColor; ?>"></span>
                    </li>
                    <li>
                        <span>普通键通用前景正常颜色: 0x</span>
                        <span><input class="color" maxlength="6" type="text" name="keyColor" value="<?php echo $keyColor; ?>"></span>
                    </li>
                    <li>
                        <span>普通键通用前景按下颜色: 0x</span>
                        <span><input class="color" maxlength="6" type="text" name="keypColor" value="<?php echo $keypColor; ?>"></span>
                    </li>
                    <li>
                        <span>候选栏图标前景正常颜色: 0x</span>
                        <span><input class="color" maxlength="6" type="text" name="iconColor" value="<?php echo $iconColor; ?>"></span>
                    </li>
                    <li>
                        <span>候选栏图标前景按下颜色: 0x</span>
                        <span><input class="color" maxlength="6" type="text" name="iconpColor" value="<?php echo $iconpColor; ?>"></span>
                    </li>
                    <li>
                        <span>首个候选字颜色: 0x</span>
                        <span><input class="color" maxlength="6" type="text" name="candfColor" value="<?php echo $candfColor; ?>"></span>
                    </li>
                    <li>
                        <span>候选字正常颜色: 0x</span>
                        <span><input class="color" maxlength="6" type="text" name="candColor" value="<?php echo $candColor; ?>"></span>
                    </li>
                    <li>
                        <span>候选字按下颜色: 0x</span>
                        <span><input class="color" maxlength="6" type="text" name="candpColor" value="<?php echo $candpColor; ?>"></span>
                    </li>
                </ul>
                <div>
                    <button class="save" name="save">保存</button>
                </div>
            </form>
        </div>
</body>

</html>
