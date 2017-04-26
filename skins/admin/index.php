<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>添加皮肤</title>
</head>

<body>
    <?php
    if($_POST){

        $id = $_POST['id'];
        $name = $_POST['name'];
        $author = $_POST['author'];
        $size = $_POST['size'];
        $description = $_POST['description'];
        $update = $_POST['update'];
        $star = $_POST['star'];
        $type = $_POST['type'];
        $lables = explode(',',$_POST['lables']);
        $time = $_POST['time'];
        
        $skinspath = "skins_sql.json";
        $skins = file_get_contents($skinspath);
        $newskins = "[\r\n";
        $newskins .= "{\r\n\t\"id\":\"$id\",\r\n\t";
        $newskins .= "\"name\":\"$name\",\r\n\t";
        $newskins .= "\"author\":\"$author\",\r\n\t";
        $newskins .= "\"size\":\"$size\",\r\n\t";
        $newskins .= "\"description\":\"$description\",\r\n\t";
        $newskins .= "\"update\":\"$update\",\r\n\t";
        $newskins .= "\"star\":\"$star\",\r\n\t";
        $newskins .= "\"type\":\"$type\",\r\n\t";
        $newskins .= "\"lables\": [\"$lables[0]\",\"$lables[1]\",\"$lables[2]\",\"$lables[3]\",\"$lables[4]\",\"$lables[5]\"],\r\n\t";
        $newskins .= "\"time\":\"$time\"\r\n";
        $newskins .= "}, $skins\r\n]";
        file_put_contents("skins.json",$newskins);
 
    
    }
?>

        <form action="" method="post">
            <br> ID： <input type="text" name="id">
            <br> 名称：<input type="text" name="name">
            <br> 作者：<input type="text" name="author">
            <br> 大小：<input type="text" name="size">
            <br>描述： <input type="text" name="description">
            <br>升级日志： <input type="text" name="update">
            <br>评级： <input type="text" name="star">
            <br>详情图类型： <input type="text" name="type"> <br>标签：
            <input type="text" name="lables">
            <br>更新日期： <input type="text" name="time">
            <br>


            <button>提交</button>

        </form>

</body>

</html>
