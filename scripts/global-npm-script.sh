#! /bin/bash

set -e

ACTION=$1
CI=" $2"
DIR="$(pwd)"
API_DIR="$DIR/api"
MOBILE_DIR="$DIR/mobile"

if [ $ACTION ]; then
  if [ -n "$2" ]; then
    ACTION+=$CI
  fi
  cd $API_DIR && yarn run $ACTION

  cd $MOBILE_DIR && yarn run $ACTION
else
  echo "Script cannot be ran without action parameter..."
  exit 1
fi
