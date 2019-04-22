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

Generate service account for your local environment.

```
$ gcloud auth application-default login
```

Run service locally with pretty printed bunyan logs with

```
$ npm run dev
```

## Deploy

`npm run deploy`

## Notes

Instead of logging in with gcloud you can run this locally you by
setting the following ENVARS

* GCLOUD\_PROJECT
  - Name of your project
* GOOGLE\_APPLICATION\_CREDENTIALS
  - Path to local service account credentials
  - more details at https://cloud.google.com/docs/authentication/getting-started

## TODO


