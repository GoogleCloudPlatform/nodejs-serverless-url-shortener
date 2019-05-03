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
