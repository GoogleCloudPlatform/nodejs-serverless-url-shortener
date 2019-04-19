const { getURL, query, end } = require('../db');

const stmt = `INSERT INTO \`shortlinks\` SET ?`;

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

async function main() {
  let result;
  try {
    result = await createShortLink('src', 'https://github.com/MylesBorins/nodejs-serverless-url-shortener');
  }
  catch (e) {
    throw new Error(e);
  }
  if (!result) {
    console.log('already exists');
  }
  else {
    console.log('link made');
  }
  await end();
}

main().catch(e => {
  console.error(e);
});
