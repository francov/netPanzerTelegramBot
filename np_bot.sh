#!/bin/bash

set -e


pushd $(dirname $0)

. envfile
if [ -z $1 ]; then
  echo -e "Usage:\n  $0 start\n  $0 stop\n  $0 restart"
  exit 1
fi
pm2 $1 np_bot.js

popd
