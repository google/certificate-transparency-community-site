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
