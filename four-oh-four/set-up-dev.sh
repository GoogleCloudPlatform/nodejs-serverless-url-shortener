gcloud config set run/region us-central1
export PROJECT_ID=$(gcloud config get-value project 2> /dev/null)
export IMAGE="gcr.io/$PROJECT_ID/fortune-telling-cow"