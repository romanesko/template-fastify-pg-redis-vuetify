#!/usr/bin/env bash

if [ -z "$1" ]; then
  echo "First param should be dev or prod"
  exit 1
fi

if [ $1 = 'prod' ]; then
  echo Running prod mode
  MODE=PROD
  COMPOSE_FILE=docker-compose.prod.yml
elif [ $1 = 'dev' ]; then
  echo Running dev mode
  MODE=DEV
  COMPOSE_FILE=docker-compose.dev.yml
else
  echo "Unknown mode (should be dev or prod)"
  exit 1
fi

function gen_passwd(){
  echo "$RANDOM`date +%s`$RANDOM" | sha256sum | base64 | head -c $1
}

function add_env(){
  grep $1= .env > /dev/null || echo $1=$2 >> .env
}

touch .env
grep 'PROJECT_NAME'= .env > /dev/null
if [ $? -eq 1 ]; then
  echo -n "Project name ([A-z0-9_-]): "
  read PROJECT_NAME
  add_env PROJECT_NAME $PROJECT_NAME
  add_env BACKEND_PORT 2999
  add_env FRONTEND_PORT 3000
  add_env DB_PORT 5433
  add_env DB_DATABASE $PROJECT_NAME
  add_env DB_USER $PROJECT_NAME
  add_env DB_PASSWORD $(gen_passwd 32)
  add_env REDIS_PORT 6379
fi


if [ $MODE = 'DEV' ]; then
  docker-compose -f $COMPOSE_FILE up --build 
elif [ $MODE = 'PROD' ]; then
  docker-compose -f $COMPOSE_FILE stop
  docker-compose -f $COMPOSE_FILE up -d --build
  echo -e "to see the logs:\n  docker-compose -f $COMPOSE_FILE logs -f"
  echo -e "to stop:\n  docker-compose -f $COMPOSE_FILE stop"

else
  echo "ooops"
  exit 1
fi


