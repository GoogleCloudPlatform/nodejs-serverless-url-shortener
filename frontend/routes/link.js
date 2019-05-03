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
const crypto = require('crypto');

const express = require('express');
const fetch = require('node-fetch');

const logger = require('../logger');

const createShortLinkURL = process.CREATE_SHORT_LINK_URL ||
  'https://us-central1-serverless-io-19.cloudfunctions.net/createShortLink';

const router = express.Router();

/* handle /link. */
router.use('/', async (req, res, next) => {
  let {url, shortlink} = req.query;

  if (!url) {
    const err = new Error('need to include "url" parameter');
    err.status = 422;
    return next(err);
  }
  
  if (url.search(/http?s:\/\//) !== 0) {
    const err = new Error('Cannot shorten invalid URL. Must start with http(s)://');
    err.status = 400;
    return next(err);
  }

  if (!shortlink) {
    shortlink = crypto.createHash('sha256')
                      .update(url)
                      .digest('hex')
                      .slice(0,7);
  }

  try {
    logger.info(`creating shortlink: ${shortlink} for url: ${url}`);
    const response = await fetch(`${createShortLinkURL}?shortlink=${shortlink}&longlink=${url}`);
    
    if (response.status !== 200) {
      const err = new Error(message)
      err.status = response.status;
      return next(err);
    }
    const {port} = res.app.locals;
    const result = `https://${req.hostname}${port === 80 || port === 443 ? '': ':' + port}/${shortlink}`;
    logger.info(`shortlink: ${result} created for url: ${url}`);
    res.render('link', {
      title: 'URL Shortener',
      url: result
    });
  } catch (e) {
    next(e)
  }
});

module.exports = router;
