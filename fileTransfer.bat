@echo off
REM Pakowanie projektu bez node_modules
tar --exclude='node_modules' -czf myWS.tar.gz -C E:\Users\Karol\Documents\PersonalProjects myWS

REM Wysyłanie archiwum na serwer
scp myWS.tar.gz karol@192.168.1.125:/home/karol/hosting/

REM Usuwanie lokalnego archiwum po wysłaniu
del myWS.tar.gz

echo Gotowe! Zaloguj się na serwer i rozpakuj archiwum:
echo ssh karol@192.168.1.125
echo cd /home/karol/hosting/
echo tar -xzf myWS.tar.gz
echo docker compose up -d --build