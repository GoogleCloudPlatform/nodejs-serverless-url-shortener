# Copyright 2019 Google LLC
# 
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
# 
#     http://www.apache.org/licenses/LICENSE-2.0
gcloud config set run/region us-central1
export PROJECT_ID=$(gcloud config get-value project 2> /dev/null)
export IMAGE="gcr.io/$PROJECT_ID/fortune-telling-cow"