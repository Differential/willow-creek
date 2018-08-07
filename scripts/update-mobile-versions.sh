#!/bin/bash

set -e

cd ..

# Declare variables
currentVersion=$(cd mobile && node -p "require('./package.json').version")
version=$1
dir=$(pwd)
mobileDIR=$dir/mobile
apiDIR=$dir/api
androidDIR=$dir/mobile/android
iosDIR=$dir/mobile/ios

# Update android build.gradle to new version
sed -i "" -e "s/versionName \"$currentVersion\"/versionName \"$version\"/g" $androidDIR/app/build.gradle

# Update ios to new version
cd $iosDIR && xcrun agvtool new-marketing-version $1

cd $dir

# Commit
git add .
git commit -m "updated android and ios to v${version}"
