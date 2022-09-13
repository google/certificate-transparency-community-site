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

document.addEventListener('DOMContentLoaded', () => {
  handleMenuClick();
  handleSubMenuHover();
  handleResize();

  handleHomepageCounter();

  handleTableUpdate();

  prepareEventGrids();

  processAllSvg();

  if (document.getElementById("step-by-step")) {
    // console.log("Waiting for load for stepbystep");
    let stepByEl = document.querySelector("#stepby .svg-obj");
    stepByEl.addEventListener('load', function () {
      // console.log("Loaded");
      setHeightForStepByStep();
    });
    stepByEl.data = stepByEl.data; // force the listener to fire;

    updateStepByStepPositions();
  }

});

function handleHomepageCounter() {
  if(document.getElementById("cert-count")) {
    fetch("https://ct.cloudflare.com/data/total", {cache: "no-store"})
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
        const newNum = parseInt(data);
        const el = document.getElementById("cert-count");
        let oldNum = parseInt(el.innerText.replace(/\,/g, ""));
        if(oldNum == newNum) {
          oldNum = newNum - (Math.floor(Math.random() * 1000));
        }
        const counter = new CountUp(el, oldNum, newNum);
        if (!counter.error) {
          const waypoint = new Waypoint({
            element: el,
            offset: 800,
            handler: function () {
              counter.start();
            }
          })
        } else {
          console.error(counter.error);
        }
      });
  }
}

function handleTableUpdate() {
  if(document.getElementById("logs-table")) {
    // get latest logs from google
    const googLogsURL = "https://www.gstatic.com/ct/log_list/v3/all_logs_list.json";
    // get latest logs from apple
    const appleLogsURL = "https://valid.apple.com/ct/log_list/current_log_list.json";
    const uptimesURL = "https://www.gstatic.com/ct/compliance/uptime.csv";

    try {
      Promise.all([googLogsURL, appleLogsURL, uptimesURL].map(url =>
        fetch(url)
          .then(r => r.text())                 
      ))
      .then(([googLogsData, appleLogsData, uptimesData]) => {
        const googLogs = JSON.parse(googLogsData);
        const appleLogs = JSON.parse(appleLogsData);

        let rawUptimes = uptimesData.split("\n");
        rawUptimes.shift();
        uptimes = {};
        rawUptimes.forEach(u => {
          const keyValue = u.split(",")
          const uptime = {};
          uptimes[keyValue[0]] = keyValue[1];
        });

        // process and merge goog/applelogs
        // deepmerge
        const mergedLogs = deepMerge(googLogs, appleLogs);

        let allLogs = [];
        let retiredIds = [];
        let pendingIds = []

        mergedLogs.operators.forEach(operator => {
          operator.logs.forEach(log => {
            log.operator = operator.name;
            allLogs.push(log);
          })
        });

        // filter
        allLogs = allLogs.filter((log) => {
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

        //some logs are active in one list and retired in another, priotise retired
        allLogs = allLogs.filter((log) => {
          return !retiredIds.includes(log.log_id);
        });

        // filter duplicates
        allLogs = allLogs.filter((obj, pos, arr) => {
          return arr.map(mapObj => mapObj["log_id"]).indexOf(obj["log_id"]) === pos;
        });

        // sort
        allLogs.sort((a, b) => a.description.localeCompare(b.description));
        allLogs.sort((a, b) => a.operator.localeCompare(b.operator));

        // decorate with uptimes
        allLogs.forEach( (log) => {
          if(Object.keys(uptimes).includes(log.url)) {
            log.uptime = uptimes[log.url];
          }
        });

        // render
        let prevOperator = "";
        const logRows = allLogs.map( log => {
          const operator = (log.operator == prevOperator) ? "" : log.operator;
          prevOperator = log.operator;
          const markup = `
          <tr data-log-url="${log.url}">
            <td>
              ${operator}
            </td>
            <td>${log.description}</td>
            <td>
              ${log.temporal_interval ? log.temporal_interval.start_inclusive.split("T")[0] : ""}
            </td>
            <td>
              ${log.temporal_interval ? log.temporal_interval.end_exclusive.split("T")[0] : ""}
            </td>
            <td class='uptime'>${log.uptime}</td>
          </tr>
          `;
          return markup;
        });

        document.querySelector("#logs-table tbody").innerHTML = logRows.join("");
        
      })
    }
    catch(err) {
      console.log(err);
    };
  }
}

function handleMenuClick() {
  document.querySelector('#mobilemenu-controls .hide-menu').addEventListener('click', (event) => {
    closeMenu();
    event.preventDefault();
    return false;
  });

  document.querySelector('#nav-shield').addEventListener('click', (event) => {
    closeMenu();
    event.preventDefault();
    return false;
  });

  document.querySelector('#mobilemenu-controls .show-menu').addEventListener('click', (event) => {
    openMenu();
    event.preventDefault();
    return false;
  });
}

function handleSubMenuHover() {
  // document.querySelector("li.submenu-target span").addEventListener('mouseover', (event) => {
  //   console.log("hover");
  //   document.querySelector("ul.submenu").classList.add('visible');
  //   document.querySelector("ul.submenu").addEventListener('mouseout', (event) => {
  //     document.querySelector("ul.submenu").classList.remove('visible');
  //   });
  // });
}

function handleResize() {
  window.addEventListener('resize', (event) => {
    updateStepByStepPositions();
    if (window.innerWidth > 736) {
      closeMenu();
    }
    setHeightForStepByStep();
  });
}

function openMenu() {
  document.querySelector('#top ul.menu').classList.add("visible");
  document.querySelector('#top ul.elsewhere').classList.add("visible");
  document.querySelector('#mobilemenu-controls').classList.add("menu-visible");
  document.querySelector('#nav-shield').classList.add("menu-visible");
}

function closeMenu() {
  document.querySelector('#top ul.menu').classList.remove("visible");
  document.querySelector('#top ul.elsewhere').classList.remove("visible");
  document.querySelector('#mobilemenu-controls').classList.remove("menu-visible");
  document.querySelector('#nav-shield').classList.remove("menu-visible");
}

function animateSvg(svgEl) {
  let svgDoc = svgEl.contentDocument;
  let classToAnimate = svgEl.dataset.animateSvgSelector;
  let lines = svgDoc.querySelectorAll(classToAnimate);

  lines.forEach((line) => {
    line.style.strokeDasharray = '6 3';
    line.style.animation = 'dash 80s linear infinite';
    line.style.stroke = "black";

    if (svgEl.dataset.animatedStrokeWidth) {
      line.style.strokeWidth = svgEl.dataset.animatedStrokeWidth;
    } else {
      line.style.strokeWidth = "2px";
    }

    line.style.fill = 'none important';
  });

  let styleEl = svgDoc.createElementNS("http://www.w3.org/2000/svg", "style");
  styleEl.type = "text/css";
  svgDoc.firstChild.prepend(styleEl);

  svgDoc.styleSheets[0].insertRule('\
    @keyframes dash {\
      to   { stroke-dashOffset: 1000; }\
    }'
  );

  svgDoc.styleSheets[0].insertRule('\
    .rev {\
      animation-direction: reverse!important;\
    }'
  );

  svgDoc.styleSheets[0].insertRule('\
    @-webkit-keyframes dash {\
      to   { stroke-dashOffset: 1000; }\
    }'
  );
}

function fixStrokes(svgEl) {
  let svgDoc = svgEl.contentDocument;

  let styleEl = svgDoc.createElementNS("http://www.w3.org/2000/svg", "style");
  styleEl.type = "text/css";
  svgDoc.firstChild.prepend(styleEl);

  svgDoc.styleSheets[0].insertRule('\
    line,path,rect,ellipse,circle,path,polyline,polygon {\
      vector-effect: non-scaling-stroke;\
      shape-rendering: geometricPrecision;\
    }'
  );
}

function processAllSvg() {
  let svgElements = document.querySelectorAll("object.svg-obj");

  svgElements.forEach((svgEl) => {
    // wait for the actual SVG doc to have loaded in
    // console.log("Waiting on load of ", svgEl);
    svgEl.addEventListener('load', () => {
      // console.log("Loaded: ", svgEl);
      if (svgEl.dataset.animateSvgSelector) {
        animateSvg(svgEl)
      }
      fixStrokes(svgEl);
    });
    svgEl.data = svgEl.data; // force onload event
  })
}

function setHeightForStepByStep() {
  if (document.getElementById("illustration-and-steps")) {
    let illustrationHeight = document.getElementById("step-by-svg").scrollHeight;
    let stepsHeight = document.querySelector("#step-by-step ol").scrollHeight;

    if (stepsHeight > illustrationHeight) {
      // console.log("Setting height to stepsHeight ", stepsHeight);
      document.getElementById("illustration-and-steps").style.height = (stepsHeight + "px");
    } else {
      // console.log("Setting height to illustrationHeight ", illustrationHeight);
      document.getElementById("illustration-and-steps").style.height = (illustrationHeight + "px");
    }

  }
}

function updateStepByStepPositions() {
  document.querySelectorAll("#step-by-step ol > li").forEach((el, i) => {
    // console.log(el);
    if (window.innerWidth > 1068) {
      // if lg
      el.style.marginTop = `${el.dataset.marginTopLg}px`;
    } else if (window.innerWidth > 736) {
      // elsif md
      el.style.marginTop = `${el.dataset.marginTopMd}px`;
    } else {
      // else sm, remove marginTop
      el.style.marginTop = "";
    }
  })

  document.querySelectorAll("#step-by-step ol > li .description").forEach((el, i) => {
    console.log(el);
    if (window.innerWidth > 1068) {
      // if lg
      el.style.maxHeight = "";
    } else if (window.innerWidth > 736 && el.dataset.overflowAt) {
      // elsif md
      el.style.maxHeight = `${el.dataset.overflowAt}px`;
    } else {
      // else sm, remove marginTop
      el.style.maxHeight = "";
    }
  })
}

function prepareEventGrids() {
  document.querySelectorAll(".toggle-all-events a").forEach(el => {
    el.addEventListener("click", (e) => {
      const gridToToggle = el.dataset.grid;

      const grid = document.getElementById(`${gridToToggle}-grid`);
      grid.classList.toggle('show-all');
      if (el.innerText == "see all +") {
        el.innerText = "see headlines -"
      } else {
        el.innerText = "see all +"
      }
    });
  });
}

function deepMerge(...objects) {
  const isObject = obj => obj && typeof obj === 'object';
  
  return objects.reduce((prev, obj) => {
    Object.keys(obj).forEach(key => {
      const pVal = prev[key];
      const oVal = obj[key];
      
      if (Array.isArray(pVal) && Array.isArray(oVal)) {
        prev[key] = pVal.concat(...oVal);
      }
      else if (isObject(pVal) && isObject(oVal)) {
        prev[key] = deepMerge(pVal, oVal);
      }
      else {
        prev[key] = oVal;
      }
    });
    
    return prev;
  }, {});
}