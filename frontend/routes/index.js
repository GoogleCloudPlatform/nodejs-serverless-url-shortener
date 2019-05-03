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
const fetch = require('node-fetch');
const logger = require('../logger');

const getShortLinkURL = process.GET_SHORT_LINK_URL ||
  'https://us-central1-serverless-io-19.cloudfunctions.net/getURL';

const router = express.Router({ mergeParams : true });

/* GET home page. */
router.get('/', async (req, res, next) => {
  const {shortlink} = req.params;
  if (!shortlink) {
    res.render('index', {
      title: 'URL Shortener'
    });
    return;
  } else if (shortlink.includes('.')) {
    next();
    return;
  }
  logger.debug(`request received for shortlink: ${shortlink}`)
  try {
    const req = await fetch(`${getShortLinkURL}?shortlink=${shortlink}`);
    const message = await req.text();

    if (req.status !== 200) {
      const err = new Error(message)
      err.status = req.status;
      next(err);
      return;
    };

    logger.info(`redirecting to: ${message}`)
    res.redirect(message);
  } catch (e) {
    next(e)
  }
});

module.exports = router;
