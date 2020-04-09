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

const fs = require("fs"),
  deepmerge = require("deepmerge"),
  path = require("path"),
  csvParse = require('csv-parse/lib/sync'),
  _ = require("lodash");

const appleString = fs.readFileSync("data/apple_current_logs.json", {encoding: "utf-8"});
const googleString = fs.readFileSync("data/google_current_logs.json", {encoding: "utf-8"});
const uptimeString = fs.readFileSync("uptime.csv", {encoding: "utf-8"});
const appleLogs = JSON.parse(appleString);
const googleLogs = JSON.parse(googleString);

const uptimeArray = csvParse(uptimeString, {fromLine: 2});

let uptimes = {};
uptimeArray.forEach( (arr) => uptimes[arr[0]] = arr[1] );

// deepmerge works better, for our purposes,
// than just using spread operators
const mergedLogs = deepmerge(appleLogs, googleLogs);

let allLogs = [];
mergedLogs.operators.forEach(operator => {
  operator.logs.forEach(log => {
    log.operator = operator.name;
    allLogs.push(log);
  })
});

// sort
allLogs = _.sortBy(allLogs,['operator', 'description'] );

let retiredIds = [];
let pendingIds = [];

// filter retired/rejected
allLogs = _.filter(allLogs, (log) => {
  // filter any without a state
  if(!log.state) {
    return false;
  }

  const stateName = Object.keys(log.state)[0];
  if(['retired', 'rejected', 'readonly'].includes(stateName)) {
    retiredIds.push(log.log_id)
    return false;
  }
  if(['pending'].includes(stateName)) {
    pendingIds.push(log.log_id)
    return false;
  }
  return true;
});

// some logs that are marked as active are retired/rejected in other lists
// they should now be removed.
allLogs = _.filter(allLogs, (log) => {
  return !retiredIds.includes(log.log_id);
});

// filter duplicates by uniq id
allLogs = _.uniqBy(allLogs, "log_id");

// decorate with uptimes


allLogs.forEach( (log) => {
  if(Object.keys(uptimes).includes(log.url)) {
    log.uptime = uptimes[log.url];
  }
});

// finally restructure by operator:
const outputLogs = {}
allLogs.forEach((log) => {
  if(outputLogs[log.operator]) {
    outputLogs[log.operator].push(log);
  } else {
    outputLogs[log.operator] = [log];
  }
})

// emit string
const allLogsString = JSON.stringify(outputLogs, false, 2);
const dataPath = path.join(__dirname, '..', 'data', 'consolidated_log_list.json');

fs.writeFileSync(dataPath, allLogsString);
