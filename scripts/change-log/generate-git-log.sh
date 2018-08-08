#!/bin/bash
set -e

currentVersion=$(cd mobile && node -p "require('./package.json').version")
commits=$(git log v$currentVersion..master --pretty=", %s (%h)")

pwd=$(pwd)

node $pwd/change-log/append-change-log $commits ','
