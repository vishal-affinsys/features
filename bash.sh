#!/bin/bash
# This is a comment

cd android 
./gradlew clean
cd ../

git add .
echo "Enter commit name"
read commit

git commit -m $commit
echo "Enter branch name"
read branch
git push origin $branch

