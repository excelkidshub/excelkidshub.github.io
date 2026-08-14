@echo off
echo Starting ExcelKidsHub local server...
echo.
echo Static server: http://localhost:8000
echo API proxy: http://localhost:3000 (proxies to https://api.excelkidshub.in)
echo.
echo Press Ctrl+C to stop the servers
echo.

REM Check if Node.js is available for proxy
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Check if Python is available for static server
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Python is not installed or not in PATH
    echo Please install Python from https://python.org/
    pause
    exit /b 1
)

REM Start Node.js proxy server in background
echo Starting API proxy server on port 3000...
start "ExcelKidsHub Proxy" cmd /k "node proxy-server.js"

REM Wait a moment for proxy to start
timeout /t 2 /nobreak >nul

REM Start Python HTTP server on port 8000
echo Starting static file server on port 8000...
start http://localhost:8000
python -m http.server 8000
