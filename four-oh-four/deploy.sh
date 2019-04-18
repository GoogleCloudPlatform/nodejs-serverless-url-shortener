#!/bin/sh

gcloud builds submit --tag gcr.io/serverless-io-19/fortune-telling-cow
gcloud beta run deploy --image gcr.io/serverless-io-19/fortune-telling-cow
