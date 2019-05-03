/*
Copyright 2019 Google LLC

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
'use strict';

const express = require('express');
const logger = require('../logger');

const router = express.Router();

/* handle /link. */
router.use('/', (req, res, next) => {
  // TODO validate url
  if (!req.query.url) {
    const err = new Error('need to include url parameter');
    err.status = 422;
    logger.warn(err);
    return next(err);
  }
  // TODO should this forwrard to the rendering page?
  res.render('link', {
    title: 'URL Shortener',
    url: req.query.url
  });
});

module.exports = router;
