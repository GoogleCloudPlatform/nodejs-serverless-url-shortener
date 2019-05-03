#!/bin/sh
# Copyright 2019 Google LLC
# 
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
# 
#     http://www.apache.org/licenses/LICENSE-2.0
#

docker kill fortune-telling-cow
docker rm fortune-telling-cow

docker build -t fortune-telling-cow .
docker run -d -p 8080:8080 --name fortune-telling-cow fortune-telling-cow
