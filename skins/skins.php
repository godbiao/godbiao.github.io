<?php
header('Access-Control-Allow-Origin:*');

$skins = file_get_contents('skins.json');
//print_r($skins);
echo $skins;
?>
