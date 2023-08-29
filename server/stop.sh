#!/bin/bash

PIDS=$(lsof -i :8013 -t)
PID1=$(echo "$PIDS" | awk 'NR==1')
PID2=$(echo "$PIDS" | awk 'NR==2')

if [[ -n $PID1 ]]; then 
    kill -15 $PID1
    echo "Process with PID $PID1 stopped successfully."
else
    echo "The first pid does not exist on port 8012."
fi
if [[ -n $PID2 ]]; then 
    kill -15 $PID2
else
    echo "No process found running on port 8012."
fi