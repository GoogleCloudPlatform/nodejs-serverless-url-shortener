#!/bin/sh

PROJECT_ID=$(gcloud config get-value project 2> /dev/null)

gcloud builds submit --tag "gcr.io/$PROJECT_ID/fortune-telling-cow"
gcloud beta run deploy fortune-telling-cow --image "gcr.io/$PROJECT_ID/fortune-telling-cow"
