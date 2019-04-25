FROM alpine:3.9

# From https://github.com/Weithenn/cowsay/blob/master/Dockerfile
RUN apk update && \
    apk add --no-cache git perl && \
    cd /tmp && \
    git clone https://github.com/jasonm23/cowsay.git  && \
    cd cowsay ; ./install.sh /usr/local && \
    rm -rf /var/cache/apk/* /var/tmp/* /tmp/* && \
    apk del git
RUN apk add nmap-ncat
RUN apk add fortune

COPY . .

ENV PATH="/usr/games:${PATH}"

CMD ["./server.sh"]

EXPOSE 8080
