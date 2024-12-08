#!/bin/sh

cd ~/development-environments_exam-project || exit 1;
docker compose -f docker-compose.production.yml up -d --pull always
