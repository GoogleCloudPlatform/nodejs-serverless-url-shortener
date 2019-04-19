const { query, end } = require('../db');

async function getURL(shortLink) {
  let results = await query('SELECT * FROM shortlinks where short=?', shortLink);
  if (results.length) {
    return results[0].long
  }
  return undefined
}

async function main() {
  const results = await getURL('src');
  console.log(results);
  await end();
}

main().catch(e => {
  console.error(e);
});
