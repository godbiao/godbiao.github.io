<?php 
	class SimpleIniIterator
	{
		private $iniContent = array();	//格式化键后的INI内容
		private $fileContentString = '';
		private $curKey = '';		//保存数组当前键
		private $bMulNodeFlag = false;		//INI文件是否是由多个节点组成
		private $originalIniContent = array();	//原始文件中的INI内容
		private $filename = '';
		
		public function __construct($filename)
		{
			$this->filename = $filename;			
			$this->setIniContent();						
		}
		
		/**
		 * 
		 * 初始化Ini文件数组
		 */
		private function setIniContent()
		{
			$this->fileContentString = file_get_contents($this->filename);
			$arrTemp = preg_split('/\\r\\n/', $this->fileContentString);
			$this->iniContent = array();
			$this->originalIniContent = array();
			
			foreach ($arrTemp as $key => $value)
			{
				if(!strpos($value, '='))
				{
					$this->curKey = rtrim(ltrim($value, '['), ']');
				}
				else
				{
					$arrValue = explode('=', $value);
					$arrKeyOrginal = $arrValue[0];
					$arrKey = strtoupper($arrValue[0]);
					$arrCurKey = strtoupper($this->curKey);
					
					$this->iniContent["$arrCurKey"]["$arrKey"] = $arrValue[1];
					$this->originalIniContent["$this->curKey"]["$arrKeyOrginal"] = $arrValue[1];
				}
			}
			
			if(count($this->iniContent) > 1) { $this->bMulNodeFlag = true; } 
		}
		
		/**
		 * 
		 * 获得INI文件的整体信息
		 */
		public function getIniContent()
		{
			return $this->originalIniContent;
		}
		
		/**
		 * 
		 * 根据节点名和键名，获得该节点下该键名的值
		 * @param int $nodeName		节点名
		 * @param int $keyName		键名
		 * @return string 键值
		 */
		public function getIniValue($nodeName, $keyName)
		{
			$nodeName = strtoupper($nodeName);
			$keyName = strtoupper($keyName);
			return $this->iniContent["$nodeName"]["$keyName"];
		}
		
		/**
		 * 
		 * 设置INI
		 * @param int $nodeName	节点名
		 * @param int $keyName	键名
		 * @param int $value	值
		 * return bool
		 */
		public function setIniValue($keyName, $value, $nodeName)
		{
			$arrCurKey = array_keys($this->iniContent);
			if(in_array(strtoupper($nodeName), $arrCurKey)) //如果节点已存在
			{
				$strNewIniContent = $this->getNewIniString($nodeName, $keyName, $value);	
			}
			else
			{
				$strNewIniContent = $this->fileContentString."\r\n";
				$strNewIniContent .= '['.$nodeName.']'."\r\n";
				$strNewIniContent .= $keyName.'='.$value."\r\n";
			}
			
			if(file_put_contents($this->filename, $strNewIniContent))
			{
				$this->setIniContent();
				return true;
			}
			else
			{
				return false;
			}			
		}
		
		/**
		 * 
		 * 获取新的INI文件内容
		 * @param int $nodeName	节点名
		 * @param int $keyName	键名
		 * @param int $newValue	值
		 * @return string 新生成的INI文件内容
		 */
		private function getNewIniString($nodeName, $keyName, $newValue)
		{
			$iniNewContent = '';
			$arrKey = array_keys($this->originalIniContent);
			
			foreach ($arrKey as $k => $v)
			{
				$iniNewContent .= '['.$v.']'."\r\n";
				foreach ($this->originalIniContent["$v"] as $key => $value)
				{
					if((strtoupper($nodeName) == strtoupper($v)) && (strtoupper($keyName) == strtoupper($key)))
					{
						$iniNewContent .= $key .'='.$newValue."\r\n";
					}
					else 
					{
						$iniNewContent .= $key .'='.$value."\r\n";	
					}
				}
			}
			return $iniNewContent;
		}
	}
	
?>
