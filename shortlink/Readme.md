# screenshot

A Node.js microservice that takes screenshots of a given URL and stores it in Google Cloud Storage.

## Dependencies

- A Google Cloud Storage bucket

## Usage

Start with `npm start`

Capture a screenshot with `\<url>`.

## Development

Run locally with pretty printed bunyan logs with `npm run dev`.

## Deploy

The first time you deploy you will need to set the environment variables.

1. `cp .env-example.yaml .env.yaml`
1. Fill out .env.yaml
1. `npm run deploy:setEnvVars`

Subsequent deployments with `npm run deploy` will inherit the initially set envars.

## Notes

To run this locally you will need to either create a `config.json` from the template
found in `config-example.json` or set the following environment variables:

* INSTANCE\_CONNECTION_NAME
  - SQL DB Connection Name
* SQL\_USER
  - username for mysql DB
* SQL\_PASSWORD
  - password for mysql DB
* SQL\_NAME
  - name of the table
