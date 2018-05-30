#! /bin/bash

set -e

DIR="$(pwd)"
API_DIR="$DIR/api"
MOBILE_DIR="$DIR/mobile"

cd $API_DIR && yarn

cd $MOBILE_DIR && yarn
