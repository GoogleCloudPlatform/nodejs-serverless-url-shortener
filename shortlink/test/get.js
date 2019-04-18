const mysql = require('mysql');
const { query, end } = require('../db');

async function main() {
  let results;
  try {
    results = await query('SELECT * FROM shortlinks where short=' + mysql.escape('f28085d9'));
    results = JSON.stringify(results);
  }
  catch (e) {
    console.error(e);
    return;
  }
  console.log(results);
  await end();
}

main().catch(e => {
  console.error(e);
});
