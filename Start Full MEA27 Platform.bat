@echo off
setlocal
title MEA27 Full Application
set "ROOT=%~dp0"

where node >nul 2>&1
if errorlevel 1 (
	echo Node.js 20+ is required. Install it, then run this file again.
	pause
	exit /b 1
)

where docker >nul 2>&1
if errorlevel 1 (
	echo Docker Desktop is required for the local MongoDB database and CMS Admin.
	echo Install and start Docker Desktop, then run this launcher again.
	pause
	exit /b 1
)

echo Starting the local MongoDB database...
docker compose -f "%ROOT%platform\compose.dev.yaml" up -d db
if errorlevel 1 (
	echo MongoDB could not be started. Confirm Docker Desktop is running.
	pause
	exit /b 1
)

if not exist "%ROOT%platform\web\node_modules" (
	echo Installing website dependencies. This happens only once...
	pushd "%ROOT%platform\web"
	call node ..\tools\yarn-1.22.22.js install
	popd
)

if not exist "%ROOT%platform\cms\node_modules" (
	echo Installing CMS dependencies. This happens only once...
	pushd "%ROOT%platform\cms"
	call node ..\tools\yarn-1.22.22.js install
	popd
)

rem Do not start a second copy when the launcher is clicked again.
netstat -ano | findstr /R /C:":3001 .*LISTENING" >nul
if errorlevel 1 (
	echo Starting Payload CMS in a separate terminal...
	start "MEA27 Payload CMS - keep this open" /D "%ROOT%platform\cms" cmd /k node ..\tools\yarn-1.22.22.js dev
) else (
	echo Payload CMS is already running on port 3001. Reusing it.
)

netstat -ano | findstr /R /C:":3000 .*LISTENING" >nul
if errorlevel 1 (
	rem The Next development cache is generated output. Clearing it prevents a
	rem stale build from conflicting with a newly started dev server.
	if exist "%ROOT%platform\web\.next" rmdir /s /q "%ROOT%platform\web\.next"
	echo Starting MEA27 website in a separate terminal...
	start "MEA27 Website - keep this open" /D "%ROOT%platform\web" cmd /k node ..\tools\yarn-1.22.22.js dev --port 3000
) else (
	echo MEA27 website is already running on port 3000. Reusing it.
)

echo.
echo Two service terminals have been opened. Keep both open while using MEA27.
echo The website will be at http://localhost:3000
echo The CMS admin will be at http://localhost:3001/admin
timeout /t 8 /nobreak >nul
start "" "http://localhost:3000"
start "" "http://localhost:3001/admin"
pause
endlocal
