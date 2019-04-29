/**
 * Copyright 2019, Google LLC
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

// [START logging_bunyan_quickstart]
const bunyan = require('bunyan');
const production = process.env.NODE_ENV === 'production';
if (production) {
  // Imports the Google Cloud client library for Bunyan
  const {LoggingBunyan} = require('@google-cloud/logging-bunyan');
  // Creates a Bunyan Stackdriver Logging client
  const loggingBunyan = new LoggingBunyan();
}

const streams = [{
  stream: process.stdout,
  level: 'info'
}];

if (production) streams,push(loggingBunyan.stream('info'));
// Create a Bunyan logger that streams to Stackdriver Logging
// Logs will be written to: "projects/YOUR_PROJECT_ID/logs/bunyan_log"
const logger = bunyan.createLogger({
  // The JSON payload of the log as it appears in Stackdriver Logging
  // will contain "name": "my-service"
  name: 'frontend',
  streams
});

module.exports = logger;
