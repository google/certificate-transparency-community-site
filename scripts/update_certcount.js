/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const fs = require('fs');
const path = require('path');

const dataUrl = "https://ct.cloudflare.com/data/total";

fetch(dataUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.text();
  })
  .then(count => {
    // The endpoint returns a bare number followed by a newline (e.g. "123456789\n").
    // Trim it and store the count as a number; the certcount shortcode passes this
    // value to lang.NumFmt, which cannot parse the raw newline-terminated string.
    const trimmed = count.trim();
    if (!/^\d+$/.test(trimmed)) {
      throw new Error(`Unexpected count value: ${JSON.stringify(trimmed)}`);
    }
    const asof = new Date().toISOString().slice(0, 10);
    const countString = JSON.stringify({ count: Number(trimmed), asof }, false, 2);
    const dataPath = path.join(__dirname, '..', 'data', 'certcount.json');
    fs.writeFileSync(dataPath, countString);
  })
  .catch(error => {
    console.error('Error updating certificate count:', error);
  });