#!/bin/bash
clear
cd /Documents/MyApps/OSC
git reset --hard
git pull origin master

 if [ "$#" -eq  "0" ]
   then
    node index.js
 else
    node index.js $1
 fi
