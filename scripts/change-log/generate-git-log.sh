#!/bin/bash
set -e

currentVersion=$(node -p "require('./package.json').version")
commits=$(git log v$currentVersion..master --pretty=", %s (%h)")

pwd=$(pwd)

node $pwd/scripts/change-log/append-change-log $commits ','
