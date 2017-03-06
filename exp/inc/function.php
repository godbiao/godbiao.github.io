<?php

//uuid生成
function guid(){
    if (function_exists('com_create_guid')){
        return com_create_guid();
    }else{
        mt_srand((double)microtime()*10000);
        $charid = md5(uniqid(rand(), true));
        $hyphen = chr(45);// "-"
        $uuid = substr($charid, 0, 8).$hyphen
                .substr($charid, 8, 4).$hyphen
                .substr($charid,12, 4).$hyphen
                .substr($charid,16, 4).$hyphen
                .substr($charid,20,12);
        return $uuid;
    }
}
 
 //创建文件夹
 function createDir($aimUrl) {
        $aimUrl = str_replace('', '/', $aimUrl);
        $aimDir = '';
        $arr = explode('/', $aimUrl);
        $result = true;
        foreach ($arr as $str) {
            $aimDir .= $str . '/';
            if (!file_exists($aimDir)) {
                $result = mkdir($aimDir);
            }
        }
        return $result;
    }
	
 // 删除文件夹 
function deldir($dir) {
  $dh=opendir($dir);
  while ($file=readdir($dh)) {
    if($file!="." && $file!="..") {
      $fullpath=$dir."/".$file;
      if(!is_dir($fullpath)) {
          unlink($fullpath);
      } else {
          deldir($fullpath);
      }
    }
  }
  closedir($dh);
  //删除当前文件夹：
  if(rmdir($dir)) {
    return true;
  } else {
    return false;
  }
}


/*删除指定目录下的文件，不删除目录文件夹*/
function delFile($dirName){
    if(file_exists($dirName) && $handle=opendir($dirName)){
        while(false!==($item = readdir($handle))){
            if($item!= "." && $item != ".."){
                if(file_exists($dirName.'/'.$item) && is_dir($dirName.'/'.$item)){
                    delFile($dirName.'/'.$item);
                }else{
                    if(unlink($dirName.'/'.$item)){
                        return true;
                    }
                }
            }
        }
        closedir( $handle);
    }
}

//文件复制
function recurse_copy($src,$des) {
    $dir = opendir($src);
    @mkdir($des);
    while(false !== ( $file = readdir($dir)) ) {
             if (( $file != '.' ) && ( $file != '..' )) {
                    if ( is_dir($src . '/' . $file) ) {
                            recurse_copy($src . '/' . $file,$des . '/' . $file);
                    }  else  {
                            copy($src . '/' . $file,$des . '/' . $file);
                    }
            }
      }
    
     closedir($dir);
   }
 
 //写入配置ini
function write_ini_file($assoc_arr, $path, $has_sections=FALSE) { 
    $content = ""; 
    if ($has_sections) { 
	$content .= "#注意文件为utf-8格式\r\n";
        foreach ($assoc_arr as $key=>$elem) {
            $content .= "[".$key."]\r\n"; 
            foreach ($elem as $key2=>$elem2) { 
                if(is_array($elem2)) 
                { 
                    for($i=0;$i<count($elem2);$i++) 
                    { 
                        $content .= $key2."[]=".$elem2[$i]."\r\n";
                    } 
                }
                else if($elem2=="") $content .= $key2." = \r\n"; 
                else $content .= $key2."=".$elem2."\r\n"; 
            } 
			$content .= "\r\n";
        } 
    } 
    else { 
        foreach ($assoc_arr as $key=>$elem) { 
            if(is_array($elem)) 
            { 
                for($i=0;$i<count($elem);$i++) 
                { 
                    $content .= $key2."[] = ".$elem[$i]."\r\n"; 
                } 
            } 
            else if($elem=="") $content .= $key2." = \r\n"; 
            else $content .= $key2."=".$elem."\r\n"; 
        } 
    }
    if (!$handle = fopen($path, 'w')) { 
        return false; 
    } 
    if (!fwrite($handle, $content)) { 
        return false; 
    } 
    fclose($handle); 
    return true; 
}

?>
