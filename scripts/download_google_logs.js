const https = require('https'),
      fs   = require('fs'),
      path = require('path'),
      url  = require('url');


const dataPath = path.join(__dirname, '..', 'data');

function download(urlString, filename="", log=true) {
  if(filename==="") {
    const downloadUrl = new URL(urlString);
    const urlFile = downloadUrl.pathname.substring(downloadUrl.pathname.lastIndexOf('/')+1);

    filename = path.join(dataPath, urlFile);
  }
  const file = fs.createWriteStream(filename);

  https.get(urlString, (response) => {
    if(log) {
      console.log(`Downloading latest Google Log List to ${filename}`);
    }
    response.pipe(file);
  });
}

const googleLogList = "https://www.gstatic.com/ct/log_list/v2/all_logs_list.json";

const filePath = path.join(dataPath, 'log_list.json' );

download(googleLogList, filePath);
