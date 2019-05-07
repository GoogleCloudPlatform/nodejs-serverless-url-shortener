# Four Oh Four

A small bash micro-service with a fortune telling cow.

## Run Locally

```
$ docker build -t fortune-telling-cow .
$ docker run -d -p 8080:8080 --name fortune-telling-cow fortune-telling-cow
```

or

```
$ ./test.sh
```

## Deploy

```
$ ./deploy.sh
```

## TODO

- [ ] Deploy via locally built container

