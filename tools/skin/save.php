<?php
/*
2017年4月21日
标神
*/

//获取数据
//功能键
$funcColor = $_POST['funcColor'];
$funcpColor = $_POST['funcpColor'];
//普通键
$keyColor = $_POST['keyColor'];
$keypColor = $_POST['keypColor'];
//工具栏图标
$iconColor = $_POST['iconColor'];
$iconpColor = $_POST['iconpColor'];
//候选字
$candfColor = $_POST['candfColor'];
$candColor = $_POST['candColor'];
$candpColor = $_POST['candpColor'];
//常用符号
$combColor = $_POST['combColor'];
$combpColor = $_POST['combpColor'];
//气泡
$popColor = $_POST['popColor'];
$poppColor = $_POST['poppColor'];
//语音
$speechColor = $_POST['speechColor'];
//表情列表
$explistbColor = $_POST['explistbColor'];
//表情分类列表
$expclassbColor = $_POST['expclassbColor'];
//表情通用前景
$expColor = $_POST['expColor'];
$exppColor = $_POST['exppColor'];
//表情通用背景
$exppbColor = $_POST['exppbColor'];


//写入数据
//功能键
$func = ['602','603','618'];
setColor($func,$funcColor,$funcpColor,'','',$funcColor);

//普通键
$key = ['605','606','607','608','609','610','611','642','644','6338','651','6246','6253','6249','6250','6254','6255','6256','6257','6258','6259','6260','6261','6262','6263'];
setColor($key,$keyColor,$keypColor,'','','');

//工具栏图标
$icon = ['612'];
setColor($icon,$iconColor,$iconpColor,'',$iconpColor,'');

//候选字
$cand = ['614','668','645','654','646','629','630'];
setColor($cand,$candColor,$candpColor,$candfColor,$iconpColor,'');

//常用符号
$comb = ['617','625','627','628'];
setColor($comb,$combColor,$combpColor,'',$combpColor,'');

//气泡
$pop = ['639','641','667'];
setColor($pop,$popColor,$poppColor,$poppColor,$poppColor,'');

//语音
$speech = ['619','620','621','622','635','626','637'];
setColor($speech,$speechColor,$speechColor,'','',$speechColor);

//表情列表
$explistb = ['507'];
setColor($explistb,$explistbColor,'','','','');

//表情分类列表
$expclassb = ['506'];
setColor($expclassb,$expclassbColor,'','','','');

//表情通用前景
$exp = ['659'];
setColor($exp,$expColor,$exppColor,'','',$exppColor);

//表情通用背景
$exppb = ['660'];
setColor($exppb,'',$exppbColor,'','','');

function setColor($id,$NM_Color,$PS_Color,$FS_Color,$SL_Color,$DS_Color){
    $style = new SimpleIniIterator(INIDIR);
    foreach($id as $value){
        switch ($value)
        {
            case '618':
                $style->setIniValue('NM_Color', 'A0'.$NM_Color, $value);
                $style->setIniValue('PS_Color', 'A0'.$PS_Color, $value);
                break;
            case '610':
            case '611':
                $style->setIniValue('NM_Color', 'AA'.$NM_Color, $value);
                $style->setIniValue('PS_Color', 'FF'.$PS_Color, $value);
                break;
            case '644':
            case '6338':
                $style->setIniValue('NM_Color', '60'.$NM_Color, $value);
                $style->setIniValue('PS_Color', 'FF'.$PS_Color, $value);
                break;
            case '627':
            case '628':
                $style->setIniValue('NM_Color', '60'.$NM_Color, $value);
                break;
            case '629':
            case '630':
                $style->setIniValue('NM_Color', '60'.$NM_Color, $value);
                break;
            case '621':
            case '622':
            case '635':
            case '637':
                $style->setIniValue('NM_Color', 'FF'.$NM_Color, $value);
                $style->setIniValue('PS_Color', '80'.$PS_Color, $value);
                $style->setIniValue('DS_Color', '40'.$DS_Color, $value);
                break;
            case '626':   
                $style->setIniValue('NM_Color', '30'.$NM_Color, $value);
                break;
            case '506': 
            case '507': 
                $style->setIniValue('NM_Color', $NM_Color, $value);
                break;
            case '660': 
                $style->setIniValue('PS_Color', $PS_Color, $value);
                break;    
            default:
                $style->setIniValue('NM_Color', 'FF'.$NM_Color, $value);
                $style->setIniValue('PS_Color', 'FF'.$PS_Color, $value);
                $style->setIniValue('FS_Color', 'FF'.$FS_Color, $value);
                $style->setIniValue('SL_Color', 'FF'.$SL_Color, $value);
                $style->setIniValue('DS_Color', '80'.$DS_Color, $value); 
        }
    }    
    
    $style = '';
}

echo '<script>alert("已保存！");</script>';
?>
