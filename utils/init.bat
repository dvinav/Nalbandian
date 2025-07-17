@echo off

%~dp0mongosh.exe -f %~dp0db.js 

copy /y %~dp0mongod.cfg "C:\Program Files\MongoDB\Server\6.0\bin\"

net stop MongoDB

net start MongoDB