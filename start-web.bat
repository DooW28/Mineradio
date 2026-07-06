@echo off
cd /d "%~dp0"
title Mineradio Server
echo [Mineradio] Starting server at http://localhost:3000
echo [Mineradio] Close this window to stop the server
echo.

node server-daemon.js
pause
