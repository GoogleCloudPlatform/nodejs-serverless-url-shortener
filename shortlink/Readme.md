# shortlink

A Node.js microservice that creates short links!

## Dependencies

- Cloud SQL
- Google Cloud Functions

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

## TODO

- [ ] Local dev with functions framework
- [ ] Document Cloud SQL Proxy setup
- [ ] Document creating the DB + migrating
- [ ] Limit number of functions to max connections to SQL DB
- [ ] Redis or similar cache in front of DB for gets
