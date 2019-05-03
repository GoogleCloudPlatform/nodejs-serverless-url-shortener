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
