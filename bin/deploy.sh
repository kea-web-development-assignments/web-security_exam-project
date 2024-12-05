#!/bin/sh

cd ~/development-environments_exam-project || exit 1;
git fetch --all;

SECONDS_SINCE_LAST_COMMIT=$(($(date +%s)-$(git log origin/main -1 --pretty='format:%cd' --date='unix')))
if [ "$SECONDS_SINCE_LAST_COMMIT" -lt "30" ]; then #wait 30 seconds before deploying, so ci pipeline has a chance to run first
    exit 0;
fi;

LAST_CI_STATUS=$(glab ci list -P 1);
case "$LAST_CI_STATUS" in # exit if last ci pipeline did not succeed
    *"(success)"*) : ;;
    *) exit 0;;
esac;

DIFF=$(git diff origin/main --shortstat); # get short diff to check if main has changed
if [ -n "$DIFF" ]; then
    git pull origin main;
    docker-compose down;
    docker-compose build --no-cache;
    docker-compose up -d;
else
    exit 0;
fi;
