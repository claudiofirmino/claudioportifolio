@echo off
cd /d "%~dp0"
set PORT=8000
start "" "http://localhost:%PORT%/index.html"
where py >nul 2>nul
if %errorlevel%==0 (
  py -m http.server %PORT%
) else (
  python -m http.server %PORT%
)
