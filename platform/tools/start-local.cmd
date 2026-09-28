@echo off
setlocal

set "PROJECT_DIR=%~dp0.."
for %%I in ("%PROJECT_DIR%") do set "PROJECT_DIR=%%~fI"
set "YARN_JS=%PROJECT_DIR%\tools\yarn-1.22.22.js"
set "NODE_EXE="
for /f "delims=" %%I in ('where node 2^>nul') do if not defined NODE_EXE set "NODE_EXE=%%I"
if not defined NODE_EXE if exist "D:\Program Files\nodejs\node.exe" set "NODE_EXE=D:\Program Files\nodejs\node.exe"
if not defined NODE_EXE if exist "C:\Users\debob\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe" set "NODE_EXE=C:\Users\debob\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"

if not defined NODE_EXE (
	echo Node.js was not found. Install Node.js, then run this launcher again.
	pause
	exit /b 1
)

for %%I in ("%NODE_EXE%") do set "NODE_DIR=%%~dpI"
set "PATH=%NODE_DIR%;%PATH%"

if not exist "%YARN_JS%" (
	echo The project-local Yarn helper is missing: %YARN_JS%
	pause
	exit /b 1
)

netstat -ano | findstr /R /C:":3001 .*LISTENING" >nul
if errorlevel 1 (
	echo Starting MEA CMS on http://localhost:3001 ...
	start "MEA CMS" /b cmd /c "set PATH=%NODE_DIR%;%PROJECT_DIR%\cms\node_modules\.bin;%%PATH%% ^&^& cd /d "%PROJECT_DIR%\cms" ^&^& "%NODE_EXE%" "%YARN_JS%" dev"
) else (
	echo MEA CMS is already running on port 3001.
)

netstat -ano | findstr /R /C:":3000 .*LISTENING" >nul
if errorlevel 1 (
	echo Starting MEA website on http://localhost:3000 ...
	start "MEA Website" /b cmd /c "set PATH=%NODE_DIR%;%PROJECT_DIR%\web\node_modules\.bin;%%PATH%% ^&^& cd /d "%PROJECT_DIR%\web" ^&^& "%NODE_EXE%" "%YARN_JS%" dev --port 3000"
) else (
	echo MEA website is already running on port 3000.
)

powershell -NoProfile -Command "Start-Sleep -Seconds 4"
start "" "http://localhost:3000"
start "" "http://localhost:3001/admin"
echo.
echo MEA local services are ready. This window can be closed.
endlocal
