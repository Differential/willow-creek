#!/bin/bash
set -e

commits=$(git log v0.3.0..master --pretty=", %s (%h)")

pwd=$(pwd)

node $pwd/change-log/append-change-log $commits ','
