<?php

//读取INI
function show_ini($ini){
   foreach ($ini as $section=>$key)
{    
    echo "<span class='section'>[$section]</span><br>";
    foreach ($key as $attr=>$value)
    {
        echo "<span class='attr'>$attr</span>=<span class='value'>$value</span><br>";
    }
   echo '<br>';
}
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
