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
const mysql = require('mysql');

const logger = require('./logger');

let config;
try {
  config = require('./config');
} catch (e) {
  config = {};
}

const connectionName =
  process.env.INSTANCE_CONNECTION_NAME || config.connectionName;
const dbUser = process.env.SQL_USER || config.dbUser;
const dbPassword = process.env.SQL_PASSWORD || config.dbPassword;
const dbName = process.env.SQL_NAME || config.dbName;

const mysqlConfig = {
  connectionLimit: 1,
  user: dbUser,
  password: dbPassword,
  database: dbName
};

if (process.env.NODE_ENV === 'production') {
  mysqlConfig.socketPath = `/cloudsql/${connectionName}`;
}

// Connection pools reuse connections between invocations,
// and handle dropped or expired connections automatically.
let mysqlPool

function query(sqlString, values) {
  // Initialize the pool lazily, in case SQL access isn't needed for this
  // GCF instance. Doing so minimizes the number of active SQL connections,
  // which helps keep your GCF instances under SQL connection limits.
  if (!mysqlPool) {
    logger.debug('creating sql pool');
    mysqlPool = mysql.createPool(mysqlConfig);
  }
  
  if (!values) values = [];

  return new Promise((resolve, reject) => {
    logger.debug('sending sql query');
    mysqlPool.query(sqlString, values, (err, results) => {
      if (err) {
        reject(err);
        return;
      }
      logger.debug('query succeeded');
      resolve(results);
    });
  });
}

async function getURL(shortlink) {
  let results = await query('SELECT * FROM shortlinks where short=?', shortlink);
  if (results.length) {
    return results[0].long
  }
  return undefined;
}

async function createShortLink(shortlink, longlink) {
  const exists = await getURL(shortlink);
  if (exists && exists === longlink) return true;
  else if (exists) return false;
  try {
    await query(`INSERT INTO \`shortlinks\` SET ?`, {
      'short': shortlink,
      'long': longlink
    });
  }
  catch (e) {
    throw new Error(e);
  }
  return true;
}

function end() {
  return new Promise((resolve, reject) => {
    logger.debug('ending sql pool');
    mysqlPool.end((err) => {
      if (err) {
        reject(err);
        return;
      }
      mysqlPool = undefined;
      logger.debug('sql pool ended');
      resolve();
    });
  });
}

module.exports = {
  createShortLink,
  end,
  getURL,
  query
};
