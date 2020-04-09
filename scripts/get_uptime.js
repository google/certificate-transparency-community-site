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

const https = require('https'),
      fs   = require('fs'),
      path = require('path');

function download(urlString, filename="", log=true) {
  if(filename==="") {
    const downloadUrl = new URL(urlString);
    const urlFile = downloadUrl.pathname.substring(downloadUrl.pathname.lastIndexOf('/')+1);

    filename = path.join(dataPath, urlFile);
  }
  const file = fs.createWriteStream(filename);

  https.get(urlString, (response) => {
    if(log) {
      console.log(`Downloading ${urlString} to ${filename}`);
    }
    response.pipe(file);
  });
}

const outputPath = "uptime.csv"
download("https://www.gstatic.com/ct/compliance/uptime.csv", outputPath);
