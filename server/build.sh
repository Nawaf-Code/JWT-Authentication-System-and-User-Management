#!/bin/bash

cd ..
cd frontend
npm run build
cd ..
cd server
python3 manage.py runserver 192.168.0.101:8013