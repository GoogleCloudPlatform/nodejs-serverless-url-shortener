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
  let {url, shortlink} = req.body;

  if (!url) {
    const err = new Error('need to include "url" parameter');
    err.status = 400;
    return next(err);
  }
  
  if (url.search(/https?:\/\//) !== 0) {
    const err = new Error('Cannot shorten invalid URL. Must start with http(s)://');
    err.status = 400;
    return next(err);
  }
  
  if (shortlink && shortlink.search(/^[^!@#$%^&*()+=\[\]{}\\\/:;"'<,>.?]+$/)) {
    const err = new Error('Invalid shortlink. Cannot use special characters.');
    err.status = 400;
    return next(err);
  }

  if (!shortlink) {
    shortlink = crypto.createHash('sha256')
                      .update(url)
                      .digest('hex')
                      .slice(0,5);
  }

  const orgin = `${req.hostname}/${shortlink}`;
  
  if (url.includes(orgin)) {
    const err = new Error('Nice try you clever dan. Recursion is not supported');
    err.status = 400;
    return next(err);
  }

  try {
    logger.info(`creating shortlink: ${shortlink} for url: ${url}`);
    const response = await fetch(`${createShortLinkURL}?shortlink=${shortlink}&longlink=${url}`);
    const message = await response.text();
    if (response.status !== 200) {
      const err = new Error(message)
      err.status = response.status;
      return next(err);
    }
    let result;
    if (process.env.NODE_ENV === 'production') {
      result = `https://${req.hostname}/${shortlink}`;
    } else {
      const {port} = res.app.locals;
      result = `http://${req.hostname}:${port}/${shortlink}`;
    }
    logger.info(`shortlink: ${result} created for url: ${url}`);
    res.render('link', {
      title: 'Success!',
      url: result
    });
  } catch (e) {
    next(e)
  }
});

module.exports = router;
