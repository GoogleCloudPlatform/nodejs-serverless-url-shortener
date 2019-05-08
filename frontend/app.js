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

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const favicon = require('serve-favicon');
const path = require('path');

const fetch = require('node-fetch');

const index = require('./routes/index');
const link = require('./routes/link');

const logger = require('./logger');

const fortuneURL = process.env.FORTUNE_TELLING_COW_URL ||
  'https://fortune-telling-cow-6jtrzyqcoa-uc.a.run.app/';

const app = express({ mergeParams : true });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/link', link);
app.use('/:shortlink?', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error(`${req.originalUrl} Not Found`);
  err.status = 404;
  next(err);
});

// error handler
app.use(async function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.status = err.status;
  res.locals.fortune = 'Have a nice day!';
  if (fortuneURL) {
    try {
      logger.debug('fetching fortune');
      res.locals.fortune = await fetch(fortuneURL).then(res => res.text());
      logger.debug('fortune received');
    } catch (e) {
      logger.error(e)
    }
  }
  // log the error
  if (err.status && /4[0-9][0-9]/.test(err.status)) logger.warn(err);
  else if (err.status) logger.error(err);
  // render the error page
  res.status(err.status || 500);
  res.render('error', {
    title: 'Error!'
  });
  next();
});

module.exports = app;
