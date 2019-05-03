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
const { getURL, query, end } = require('../db');

const stmt = `INSERT INTO \`shortlinks\` SET ?`;

async function createShortLink(shortLink, longLink) {
  const exists = await getURL(shortLink);
  if (exists && exists === longLink) return true;
  else if (exists) return false;
  try {
    const results = await query(stmt, {
      'short': shortLink,
      'long': longLink
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
