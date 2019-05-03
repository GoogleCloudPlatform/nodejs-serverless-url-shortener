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

const {
  createShortLink,
  end,
  getURL
} = require('./db');
const logger = require('./logger')

exports.getURL = async (req, res) => {
  const shortlink = req.query.shortlink || req.body.shortlink;
  if (!shortlink) {
    logger.warn('shortlink not included in request');
    res.status(400).send('Must include shortlink');
    return;
  }
  try {
    const result = await getURL(shortlink);
    if (result) {
      logger.info(`shortlink "${shortlink}" found: ${result}`);
      res.send(result);
    } else {
      logger.warn(`shortlink "${shortlink}" not found.`);
      res.status(404).send(`shortlink "${shortlink}" not found`);
    }
  }
  catch (e) {
    logger.error(e);
    res.status(500).send(e);
  }
  await end();
}

exports.createShortLink = async (req, res) => {
  const longlink = req.query.longlink || req.body.longlink;
  if (!longlink) {
    logger.warn('longlink not included in request');
    res.status(400).send('Must include parameter "longlink" in request.');
    return;
  }
  let shortlink = req.query.shortlink || req.body.shortlink;
  if (!shortlink) {
    logger.warn('shortlink not included in request');
    res.status(400).send('Must include parameter "shortlink" in request.');
    return;
  }
  try {
    const result = await createShortLink(shortlink, longlink);
    if (result) {
      logger.info(`shortlink "${shortlink}" created for ${longlink}`);
      res.send(shortlink);
    } else {
      logger.warn(`shortlink "${shortlink}" already exists.`);
      res.status(409).send(`shortlink "${shortlink}" already exists.`);
    }
  } catch (e) {
    logger.error(e);
    res.status(500).send(e);
  }
  await end();
}