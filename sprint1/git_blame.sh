# usage:
# create a text file in /sprint1/ folder named NetID.commits.txt
# run > ./git_blame.sh > NetID.commits.txt

#!/bin/bash

author="Zackery Whitscell"           # author you specifically want to look for
folders=("../app/documentation" "../components/ChatBox" "../app" "../components/ChatInput" "../components/ChatResponse")  # folders you want to use git blame on; can take multiple folders
since="2023-10-16"            # start date
until="2023-11-1"            # end date

# Iterate over each folder in the array
for folder in "${folders[@]}"; do
  # Run git blame on the files in the current folder within the specified time frame
  for file in "$folder"/*; do
    git blame --since="$since" --until="$until" "$file" | grep "$author"
  done
done