@echo off
rem Payload Admin requires the CMS and local MongoDB.
call "%~dp0Start Full MEA27 Platform.bat"
if errorlevel 1 exit /b 1
timeout /t 5 /nobreak >nul
start "" "http://localhost:3001/admin"
exit /b 0
