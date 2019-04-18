const { query, end } = require('../db');

const stmt = `INSERT INTO \`shortlinks\` SET ?`;

async function main() {
  let results;
  try {
    results = await query(stmt, {
      'short': 'f28085d9',
      'long': 'https://twitter.com/MylesBorins/status/1108250340045004800'
    });
    results = JSON.stringify(results);
    console.log(results);
  }
  catch (e) {
    console.error(e);
  }
  await end();
}

main().catch(e => {
  console.error(e);
});
