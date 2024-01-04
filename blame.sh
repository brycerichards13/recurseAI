#!/bin/bash

# Get author name
author=$(git config user.name)

# Get netID
echo "1. Enter your netid."
echo -n "> "
read netid

# Get files and directories
echo ""
echo "2. List all files and directories to blame."
echo "   Include a space between entires."
echo "   If a file or directory name has spaces, put it in "" quotes."
echo -n "> "
read files_dirs

# Get starting date of sprint
echo ""
echo "3. Enter the starting date of the sprint."
echo "   Format: YYYY-MM-DD or YYYY-MM-DD HH:MM:SS"
echo -n "> "
read start_date

# Get all files and run git blame on all files
files=$(find $files_dirs -type f)
for file in $files; do
  git blame --since=$start_date "$file" | grep "$author" >> $netid.commits.txt
done

# Print path where netid.commits.txt was made
echo ""
cwd=$(pwd)
echo "Wrote blames to $cwd/$netid.commits.txt"
