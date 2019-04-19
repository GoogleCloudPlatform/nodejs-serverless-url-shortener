const mysql = require('mysql');

const config = require('./config');

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
    mysqlPool = mysql.createPool(mysqlConfig);
  }
  
  if (!values) values = [];

  return new Promise((resolve, reject) => {
    mysqlPool.query(sqlString, values, (err, results) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results);
    });
  });
}

async function getURL(shortLink) {
  let results = await query('SELECT * FROM shortlinks where short=?', shortLink);
  if (results.length) {
    return results[0].long
  }
  return undefined
}

async function createShortLink(shortLink, fullURL) {
  const exists = await getURL(shortLink);
  if (exists && exists === fullURL) return true;
  else if (exists) return false;
  try {
    const results = await query(stmt, {
      'short': shortLink,
      'long': fullURL
    });
  }
  catch (e) {
    throw new Error(e);
  }
  return true;
}

function end() {
  return new Promise((resolve, reject) => {
    mysqlPool.end((err) => {
      if (err) {
        reject(err);
        return;
      }
      mysqlPool = undefined;
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
