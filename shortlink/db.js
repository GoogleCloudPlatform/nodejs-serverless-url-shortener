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

function end() {
  return new Promise((resolve, reject) => {
    mysqlPool.end((err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

module.exports = {
  end,
  query
};
