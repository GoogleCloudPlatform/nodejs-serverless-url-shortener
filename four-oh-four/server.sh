#!/usr/bin/env sh

if [ -z ${PORT} ]; then
  PORT=8080;
fi

trap '
 trap - INT # restore default INT handler
 kill -s INT "$$"
' INT

while true; do (
 echo "HTTP/1.0 200 Ok";
 echo "Content-Type: text/plain;charset=UTF-8";
 echo;
 fortune | cowsay
 echo;
) | nc -l -p $PORT;
done
