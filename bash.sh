#!/bin/bash
# This is a comment

cd android 
./gradlew clean
cd ../

git add .
read -p "Enter commit name: " commit
git commit -m "${commit}"

read -p "Enter branch name: " branch
git push origin "${branch}"

