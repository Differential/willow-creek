#! /bin/bash

set -e

ACTION=$1
DIR="$(pwd)"
API_DIR="$DIR/api"
MOBILE_DIR="$DIR/mobile"

if [ $ACTION ]; then
  cd $API_DIR && yarn run $ACTION

  cd $MOBILE_DIR && yarn run $ACTION
else
  echo "Script cannot be ran without action parameter..."
  exit 1
fi
