#!/usr/bin/env sh
# Copyright 2019 Google LLC
# 
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
# 
#     http://www.apache.org/licenses/LICENSE-2.0

if [ -z ${PORT} ]; then
  PORT=8080;
fi

trap '
 trap - INT # restore default INT handler
 kill -s INT "$$"
' INT

ncat -lk -p $PORT --sh-exec '
 echo "HTTP/1.0 200 Ok";
 echo "Content-Type: text/plain;charset=UTF-8";
 echo;
 fortune third_party/fortunes/wholesome | cowsay
 echo;'
