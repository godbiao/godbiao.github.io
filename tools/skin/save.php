<?php
$funcColor = $_POST['funcColor'];
$funcpColor = $_POST['funcpColor'];


$func = ['602','603'];
setColor($func,$funcColor,$funcpColor,'','',$funcColor);


function setColor($id,$NM_Color,$PS_Color,$FS_Color,$SL_Color,$DS_Color){
   $style = new SimpleIniIterator('ini/style.ini');
    for($i=0;$i<count($id);$i++){
   $style->setIniValue('NM_Color', 'FF'.$NM_Color, $id[$i]);
   $style->setIniValue('PS_Color', 'FF'.$PS_Color,  $id[$i]);
   $style->setIniValue('FS_Color', 'FF'.$FS_Color,  $id[$i]);
   $style->setIniValue('SL_Color', 'FF'.$SL_Color,  $id[$i]);
   $style->setIniValue('DS_Color', '80'.$DS_Color,  $id[$i]);
    }
  
}

$style = '';

?>
