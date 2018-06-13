<?php   

 function createZip($openFile,$zipObj,$sourceAbso,$newRelat = '')  
{  
    while(($file = readdir($openFile)) != false)  
    {  
        if($file=="." || $file=="..")  
            continue;  
        $sourceTemp = $sourceAbso.'/'.$file;  
        $newTemp = $newRelat==''?$file:$newRelat.'/'.$file;  
        if(is_dir($sourceTemp))  
        {      
            $zipObj->addEmptyDir($newTemp);
            createZip(opendir($sourceTemp),$zipObj,$sourceTemp,$newTemp);  
        }  
        if(is_file($sourceTemp))  
        {             
            $zipObj->addFile($sourceTemp,$newTemp);  
        }  
    }  
}  
 

//$exportPath = $rootdir;//设置需要打包的目录
//$filename =$rootdir.".exp";//设置压缩包的文件名
 
$zip = new ZipArchive(); 
if(!$zip->open($filename,ZIPARCHIVE::CREATE))  
{ echo "failed!";} 
else{
	createZip(opendir($exportPath),$zip,$exportPath);
	} 
$zip->close(); 

//下载
header ( "Cache-Control: max-age=0" );
header ( "Content-Description: File Transfer" );
header ( 'Content-disposition: attachment; filename=' . basename ($filename) ); // 文件名
header ( "Content-Type: application/zip" ); // zip格式的
header ( "Content-Transfer-Encoding: binary" ); // 告诉浏览器，这是二进制文件
//header ( 'Content-Length: ' . filesize ( $filename ) ); // 告诉浏览器，文件大小
@readfile ($filename);//输出文件

?>
