#!/bin/bash
set -e
if [ -z "$1" ]; then
  ./node_modules/.bin/jest
else
  ./node_modules/.bin/jest --maxWorkers=2
fi
