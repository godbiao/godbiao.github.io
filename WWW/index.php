<?php
require_once('ini_File.php');

$filename = "./biubiuV1.0.5.ini";
$inifile = new ini_File($filename);
$inifile->read();
//$item = $inifile->getItem('notice','text');
//$item->setContent($item->getContent()."測試測試中“");
//$inifile->write();
$value = $inifile->getSection('BiuBiu')->getItem('category');
var_dump($value)
//echo $value;
?>
