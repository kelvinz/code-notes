#!/bin/bash

# Backup your repository before running this script
# Prompt for the repository URL
echo "Please enter your repository url:"
read repo_url
git clone --bare $repo_url repo_temp
cd repo_temp

# Set the new email and name
CORRECT_EMAIL="takingovertheworld@gmail.com"
CORRECT_NAME="kelvin zhao"

# Run the filter-branch command to rewrite history
git filter-branch --env-filter '

# Replace "kelvinzhao@Kelvins-Mac-mini.local" with the old email address
WRONG_EMAIL="kelvinzhao@Kelvins-Mac-mini.local"
NEW_NAME="kelvin zhao"
NEW_EMAIL="takingovertheworld@gmail.com"

# If the committer email is the old email, change it to the new name and email
if [ "$GIT_COMMITTER_EMAIL" = "$WRONG_EMAIL" ]
then
    export GIT_COMMITTER_NAME="$NEW_NAME"
    export GIT_COMMITTER_EMAIL="$NEW_EMAIL"
fi
# If the author email is the old email, change it to the new name and email
if [ "$GIT_AUTHOR_EMAIL" = "$WRONG_EMAIL" ]
then
    export GIT_AUTHOR_NAME="$NEW_NAME"
    export GIT_AUTHOR_EMAIL="$NEW_EMAIL"
fi
' HEAD~62..HEAD

# Push the changes to the repository
# Be careful with this command: it force pushes the changes to the repository
git push --force --tags origin 'refs/heads/*'
