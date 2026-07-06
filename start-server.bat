@echo off
cd /d "%~dp0"
echo Starting Mineradio server...
start "Mineradio" /min cmd /c "node server.js & pause"
echo Server starting at http://localhost:3000
timeout /t 2 >nul
start http://localhost:3000
