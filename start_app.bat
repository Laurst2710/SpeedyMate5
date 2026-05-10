@echo off
echo Speedy-MATE5 - Pornire Server Local
echo.
echo Navigare in directorul logic...
cd /d "c:\Users\Laurentiu\Downloads\SpeedyMATE5\logic"
echo.
echo Pornire server Python pe portul 8000...
echo Serverul va porni la: http://127.0.0.1:8000
echo.
echo Pentru a opri serverul, apasati Ctrl+C in aceasta fereastra
echo.
python -m http.server 8000
pause
