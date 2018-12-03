@ echo off
echo 正在启用超级管理员权限...
%1 %2
ver|find "5.">nul&&goto :st
mshta vbscript:createobject("shell.application").shellexecute("%~s0","goto :st","","runas",1)(window.close)&goto :eof

:st
copy "%~0" "%windir%\system32\"
echo 启用超级管理员权限成功
@echo off  
echo     请在下面输入计算机名（和个人域账号一致），如：张磊，计算机名应为：leizhang46
set/p pcname=
echo Windows Registry Editor Version 5.00>ComputerName.reg 
echo [HKEY_CURRENT_USER\Software\Microsoft\Windows\ShellNoRoam]>>ComputerName.reg 
echo @="%pcname%">>ComputerName.reg 
echo [HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\ComputerName]>>ComputerName.reg 
echo [HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\ComputerName\ComputerName]>>ComputerName.reg 
echo "ComputerName"="%pcname%">>ComputerName.reg 
echo [HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\ComputerName\ActiveComputerName]>>ComputerName.reg 
echo "ComputerName"="%pcname%">>c:\TempInfo.reg>>ComputerName.reg 
echo [HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\Eventlog]>>ComputerName.reg 
echo "ComputerName"="%pcname%">>ComputerName.reg 
echo [HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\ComputerName\ComputerName]>>ComputerName.reg 
echo "ComputerName"="%pcname%">>ComputerName.reg 
echo [HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\Tcpip\Parameters]>>ComputerName.reg 
echo "NV Hostname"="%pcname%">>ComputerName.reg 
echo "Hostname"="%pcname%">>ComputerName.reg 
echo [HKEY_USERS\.DEFAULT\Software\Microsoft\Windows\ShellNoRoam]>>ComputerName.reg 
echo @="%pcname%">>ComputerName.reg 
regedit /s ComputerName.reg 
del /q ComputerName.reg 
echo     重启电脑即可... 
pause    
