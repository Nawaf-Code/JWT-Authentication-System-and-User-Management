#!/bin/bash
cd tempFiles
rm -rf emailTemplates
cd ..
cd build 
cp -r emailTemplates ../tempFiles
cd ..
cd ..
cd frontend
npm run build
cd ..
cd server
cd tempFiles
cp -r emailTemplates ../build
cd ..
python3 manage.py runserver 192.168.0.101:8013