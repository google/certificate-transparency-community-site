const https = require('https'),
      fs   = require('fs'),
      path = require('path');

const dataPath = path.join(__dirname, '..', 'data');

const logSources = [
  {
    name: "apple",
    url: "https://valid.apple.com/ct/log_list/current_log_list.json",
    tempfile: "apple_current_logs.json",

  },
  {
    name: "google",
    url: "https://www.gstatic.com/ct/log_list/v2/all_logs_list.json",
    tempfile: "google_current_logs.json",
  }
];

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

logSources.forEach(source => {
  const outputPath = path.join(dataPath, source.tempfile);
  download(source.url, outputPath);
});
