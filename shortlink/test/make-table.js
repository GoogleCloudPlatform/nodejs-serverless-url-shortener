const { query, end } = require('../db');

const create = `CREATE TABLE IF NOT EXISTS \`shortlinks\`(
  \`id\` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  \`short\` VARCHAR(255) NULL,
  \`long\` VARCHAR(255) NULL,
  PRIMARY KEY (\`id\`));`;

async function main() {
  let results;
  try {
    results = await query(create);
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
