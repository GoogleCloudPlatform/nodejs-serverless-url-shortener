# URL Shortener web frontend

Express.js web frontend to create shortlinks and forward requests

## Requirements

### Local Development

- Node.js LTS Dubnium /w bundled npm
  - Download from https://nodejs.org/en/download/
- gcloud cli 
  - https://cloud.google.com/sdk/gcloud/

### Cloud Deployment

- Google App Engine Standard

## Development

Install dependencies
```
$ npm install
```

Run service locally with pretty printed bunyan logs with

```
$ npm run dev
```

## Deploy

`npm run deploy`

## TODO

- [] Abstract out explicit URLs to functions
- [] Improve handling of :shortlink
- [] fix the symlinks
