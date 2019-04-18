#!/bin/sh

docker kill fortune-telling-cow
docker rm fortune-telling-cow

docker build -t fortune-telling-cow .
docker run -d -p 8080:8080 --name fortune-telling-cow fortune-telling-cow
