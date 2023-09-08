#!/bin/bash  
printf "Enter commit message: "
read -r commit

if [ -z "$commit" ]; then
    echo "Commit message cannot be empty."
    exit 1
fi

git add .
git commit -m "$commit"
git branch -M main
git push -u origin main

echo "Changes has been successfully pushed!"