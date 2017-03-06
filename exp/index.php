<!DOCTYPE html>
<html lang="zh-cn">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width,height=device-height,initial-scale=1.0">
	<title>讯飞输入法表情包在线制作工具</title>
	<link rel="icon" href="http://www.xunfei.cn/favicon.ico" type="image/x-icon" />
	<link rel="shortcut icon" href="http://www.xunfei.cn/favicon.ico" type="image/x-icon" />
	<link rel="stylesheet" href="css/style.css">
</head>

<body id="index">
	<script>
		function isIE() { //ie?  
			if (!!window.ActiveXObject || "ActiveXObject" in window)
				return true;
			else
				return false;
		}
		if (isIE()) {
			document.getElementById("index").style.display = "none";
			alert("本工具暂未适配IE浏览器！");
		}
	</script>
	<?php	
	if(@$_POST['pack']==1){
		include_once("exp.php");
	}else{
		include_once('reset.php');
	}
	?>
		<div id="start" class="start">
			<div id="new" class="new">开始制作</div>
		</div>

		<div id="finish" class="finish">
			<div id="ccontinue" class="new"><a href="" title="点击开始制作新的表情包">新制作</a></div>
			<div id="sstop" class="new regret" title="发现还有要修改的地方再改改">再改改</div>
		</div>

		<div id="header" class="header">
			<p id="header_p" style="text-align:center;">声明：1.本工具仅供个人学习测试使用 2.请使用非IE浏览器访问 3.<a href="http://pan.baidu.com/s/1jINr5jS" target="_blank">最新表情制作规范下载</a>
			</p>
		</div>

		<div id="container">
			<div class="upload">
				<form id="uploadform" action="" method="post" enctype="multipart/form-data">
					<div class="fieldset flash" id="fsUploadProgress">
						<span class="legend">上传表情主图</span>
						<div id="divStatus">
							<div class="guifan">
								格式：.PNG 透明背景,2像素白色描边
								<br> 命名：请必须按数字顺序命名,如1.png,2.png……32.png,至少8个,请勿超过32个
								<br> 尺寸：240x240px,小于200KB
							</div>

						</div>
					</div>

					<div>
						<span id="spanButtonPlaceHolder"></span>
						<input id="btnCancel" type="button" class="btnCancel" value="取消" onclick="swfu.cancelQueue();" disabled="disabled" style="margin-left: 2px; font-size: 8pt; height: 29px;" />
					</div>

				</form>
				<form id="uploadform_gif" style="display:none;" action="" method="post" enctype="multipart/form-data">
					<div class="fieldset flash" id="fsUploadProgress_gif">
						<span class="legend">上传表情主图及输入面板缩略图</span>
						<div id="divStatus_gif">
							<div class="guifan">
								格式：.GIF(主图), .PNG(缩略图),透明背景,2像素白色描边
								<br> 主图命名：请必须按数字顺序命名,如1.gif,2.gif……32.gif,至少8个,请勿超过32个
								<br> 缩略图命名：请必须按数字顺序命名,如preview_1.png,preview_2.png……preview_32.png,内容及数量与gif图一一对应
								<br> 尺寸：主图->240x240px,小于600KB;缩略图->200x200,小于100KB
							</div>
						</div>
					</div>

					<div>
						<span id="spanButtonPlaceHolder_gif"></span>
						<input id="btnCancel_gif" type="button" class="btnCancel" value="取消" onclick="swfu.cancelQueue();" disabled="disabled" style="margin-left: 2px; font-size: 8pt; height: 29px;" />
					</div>

				</form>
				<br>
				<form id="uploadform_pre" action="" method="post" enctype="multipart/form-data">
					<div class="fieldset flash" id="fsUploadProgress_pre">
						<span class="legend">上传本地表情列表封面图</span>
						<div id="divStatus_pre">
							<div class="guifan">
								格式：.PNG 透明背景,2像素白色描边
								<br> 命名：无要求，1个
								<br> 尺寸：Android->75x75px,小于40KB;iOS->99x99px,小于50KB
							</div>
						</div>
					</div>

					<div>
						<span id="spanButtonPlaceHolder_pre"></span>
						<input id="btnCancel_pre" type="button" class="btnCancel" value="取消" onclick="swfu.cancelQueue();" disabled="disabled" style="margin-left: 2px; font-size: 8pt; height: 29px;" />
					</div>

				</form>

			</div>

			<div class="info" id="info">
				<form id="infoform" name="expform" method="post" action="">
					<table class="table">
						<tr>
							<td>类型：</td>
							<td>
								<label>
									<input id="staticpng" name="type" type="radio" value="static" checked />静态PNG</label> &nbsp;&nbsp;
								<label>
									<input id="dynamicgif" name="type" type="radio" value="dynamic" />动态GIF</label> &nbsp;&nbsp;
							</td>
						</tr>
						<tr>
							<td>名称：</td>
							<td>
								<input class="w150" type="text" name="name" required="required" value="8个汉字以内" onfocus="if (value =='8个汉字以内'){value =''}" onblur="if (value ==''){value='8个汉字以内'}" />
							</td>
						</tr>
						<tr>
							<td>作者：</td>
							<td>
								<input class="w150" type="text" name="author" required="required" value="10个汉字以内" value="10个汉字以内" onfocus="if (value =='10个汉字以内'){value =''}" onblur="if (value ==''){value='10个汉字以内'}" />
							</td>
						</tr>
						<tr>
							<td>版本：</td>
							<td>
								<input class="w150" type="number" name="version" required="required" step="0.1" value="1.5" onfocus="if (value =='1.5'){value =''}" onblur="if (value ==''){value='1.5'}" />
							</td>
						</tr>
						<tr hidden="hidden">
							<td title="新的表情，这里请清空">ID：</td>
							<td>
								<input class="w150" type="text" name="uid" value="" />
							</td>
						</tr>
						<tr>
							<td>描述：</td>
							<td>
								<textarea class="w150" name="description" required="required" rows="3" cols="22" value="80个汉字以内，充分体现表情的形象特色或故事情节" onfocus="if (value =='80个汉字以内，充分体现表情的形象特色或故事情节'){value =''}" onblur="if (value ==''){value='80个汉字以内，充分体现表情的形象特色或故事情节'}">80个汉字以内，充分体现表情的形象特色或故事情节</textarea>
							</td>
						</tr>
						<tr>
							<td colspan="2" align="center">
								<br>
								<input class="pack" id="packbtn" type="submit" name="button" value="打包" />
								<input hidden="hidden" type="text" name="pack" value="1" />
							</td>
						</tr>

					</table>
				</form>
			</div>

		</div>

		<div id="footer" class="footer">
			<i><span>Alpha-1.0.20170301</span> by godBiao</i>
		</div>

		<script type="text/javascript" src="swfupload/swfupload.js"></script>
		<script type="text/javascript" src="swfupload/swfupload.queue.js"></script>
		<script type="text/javascript" src="js/fileprogress.js"></script>
		<script type="text/javascript" src="js/handlers.js"></script>
		<script type="text/javascript" src="js/upload.js">
		</script>

		<script>
			var startnew = document.getElementById("new");
			var start = document.getElementById("start");
			var header = document.getElementById("header");
			var container = document.getElementById("container");
			var ccontinue = document.getElementById("ccontinue");
			var finish = document.getElementById("finish");
			var sstop = document.getElementById("sstop");
			var packbtn = document.getElementById("packbtn");
			startnew.onclick = function () {
				start.style.display = "none";
				header.style.display = "block";
				container.style.display = "block";
			}


			packbtn.onclick = function () {
				finish.style.display = "block";
				header.style.display = "none";
				container.style.display = "none";
			}

			sstop.onclick = function () {
				finish.style.display = "none";
				header.style.display = "block";
				container.style.display = "block";

			}
		</script>


</body>

</html>