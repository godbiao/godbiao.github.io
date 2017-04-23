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
        $combColor = substr($style->getIniValue('617', 'NM_Color'),2);
        $combpColor = substr($style->getIniValue('617', 'PS_Color'),2);
        $popColor = substr($style->getIniValue('667', 'NM_Color'),2);
        $poppColor = substr($style->getIniValue('667', 'PS_Color'),2);
        $speechColor = substr($style->getIniValue('619', 'NM_Color'),2);
        $explistbColor = substr($style->getIniValue('507', 'NM_Color'),0);
        $expclassbColor = substr($style->getIniValue('506', 'NM_Color'),0);
        $expColor = substr($style->getIniValue('659', 'NM_Color'),2);
        $exppColor = substr($style->getIniValue('659', 'PS_Color'),2);
        $exppbColor = substr($style->getIniValue('660', 'PS_Color'),0);
        
        $style = '';
    }
    ?>
        <div class="main">
            <form action="" method="post">
                <ul class="list">
                    <li>
                        <span>功能键通用前景正常颜色: 0xff</span>
                        <span><input class="color" maxlength="6" type="text" name="funcColor" value="<?php echo $funcColor; ?>"></span>
                        <span class="pre-color" style="background-color:#<?php echo $funcColor; ?>"> </span>
                    </li>
                    <li>
                        <span>功能键通用前景按下颜色: 0xff</span>
                        <span><input class="color" maxlength="6" type="text" name="funcpColor" value="<?php echo $funcpColor; ?>"></span>
                        <span class="pre-color" style="background-color:#<?php echo $funcpColor; ?>"> </span>
                    </li>
                    <li>
                        <span>普通键通用前景正常颜色: 0xff</span>
                        <span><input class="color" maxlength="6" type="text" name="keyColor" value="<?php echo $keyColor; ?>"></span>
                        <span class="pre-color" style="background-color:#<?php echo $keyColor; ?>"> </span>
                    </li>
                    <li>
                        <span>普通键通用前景按下颜色: 0xff</span>
                        <span><input class="color" maxlength="6" type="text" name="keypColor" value="<?php echo $keypColor; ?>"></span>
                        <span class="pre-color" style="background-color:#<?php echo $keypColor; ?>"> </span>
                    </li>
                    <li>
                        <span>候选栏图标前景正常颜色: 0xff</span>
                        <span><input class="color" maxlength="6" type="text" name="iconColor" value="<?php echo $iconColor; ?>"></span>
                        <span class="pre-color" style="background-color:#<?php echo $iconColor; ?>"> </span>
                    </li>
                    <li>
                        <span>候选栏图标前景按下颜色: 0xff</span>
                        <span><input class="color" maxlength="6" type="text" name="iconpColor" value="<?php echo $iconpColor; ?>"></span>
                        <span class="pre-color" style="background-color:#<?php echo $iconpColor; ?>"> </span>
                    </li>
                    <li>
                        <span>首个候选字颜色: 0xff</span>
                        <span><input class="color" maxlength="6" type="text" name="candfColor" value="<?php echo $candfColor; ?>"></span>
                        <span class="pre-color" style="background-color:#<?php echo $candfColor; ?>"> </span>
                    </li>
                    <li>
                        <span>候选字正常颜色: 0xff</span>
                        <span><input class="color" maxlength="6" type="text" name="candColor" value="<?php echo $candColor; ?>"></span>
                        <span class="pre-color" style="background-color:#<?php echo $candColor; ?>"> </span>
                    </li>
                    <li>
                        <span>候选字按下颜色: 0xff</span>
                        <span><input class="color" maxlength="6" type="text" name="candpColor" value="<?php echo $candpColor; ?>"></span>
                        <span class="pre-color" style="background-color:#<?php echo $candpColor; ?>"> </span>
                    </li>
                    <li>
                        <span>常用符号前景正常颜色: 0xff</span>
                        <span><input class="color" maxlength="6" type="text" name="combColor" value="<?php echo $combColor; ?>"></span>
                        <span class="pre-color" style="background-color:#<?php echo $combColor; ?>"> </span>
                    </li>
                    <li>
                        <span>常用符号前景按下颜色: 0xff</span>
                        <span><input class="color" maxlength="6" type="text" name="combpColor" value="<?php echo $combpColor; ?>"></span>
                        <span class="pre-color" style="background-color:#<?php echo $combpColor; ?>"> </span>
                    </li>
                    <li>
                        <span>气泡前景正常颜色: 0xff</span>
                        <span><input class="color" maxlength="6" type="text" name="popColor" value="<?php echo $popColor; ?>"></span>
                        <span class="pre-color" style="background-color:#<?php echo $popColor; ?>"> </span>
                    </li>
                    <li>
                        <span>多选气泡前景按下颜色: 0xff</span>
                        <span><input class="color" maxlength="6" type="text" name="poppColor" value="<?php echo $poppColor; ?>"></span>
                        <span class="pre-color" style="background-color:#<?php echo $poppColor; ?>"> </span>
                    </li>
                    <li>
                        <span>语音界面通用前景颜色: 0xff</span>
                        <span><input class="color" maxlength="6" type="text" name="speechColor" value="<?php echo $speechColor; ?>"></span>
                        <span class="pre-color" style="background-color:#<?php echo $speechColor; ?>"> </span>
                    </li>
                    <li>
                        <span>表情列表背景颜色: 0x</span>
                        <span><input class="color" maxlength="8" type="text" name="explistbColor" value="<?php echo $explistbColor; ?>"></span>
                        <span class="pre-color" style="background-color:#<?php echo $explistbColor; ?>"> </span>
                    </li>
                    <li>
                        <span>表情分类列表背景颜色: 0x</span>
                        <span><input class="color" maxlength="8" type="text" name="expclassbColor" value="<?php echo $expclassbColor; ?>"></span>
                        <span class="pre-color" style="background-color:#<?php echo $expclassbColor; ?>"> </span>
                    </li>
                    <li>
                        <span>表情界面通用前景颜色: 0xff</span>
                        <span><input class="color" maxlength="6" type="text" name="expColor" value="<?php echo $expColor; ?>"></span>
                        <span class="pre-color" style="background-color:#<?php echo $expColor; ?>"> </span>
                    </li>
                    <li>
                        <span>表情界面通用前景按下颜色: 0xff</span>
                        <span><input class="color" maxlength="6" type="text" name="exppColor" value="<?php echo $exppColor; ?>"></span>
                        <span class="pre-color" style="background-color:#<?php echo $exppColor; ?>"> </span>
                    </li>
                    <li>
                        <span>表情界面通用按下背景颜色: 0x</span>
                        <span><input class="color" maxlength="8" type="text" name="exppbColor" value="<?php echo $exppbColor; ?>"></span>
                        <span class="pre-color" style="background-color:#<?php echo $exppbColor; ?>"> </span>
                    </li>
                </ul>
                <div>
                    <button class="save" name="save">保存</button>
                </div>
            </form>
        </div>
</body>

</html>
