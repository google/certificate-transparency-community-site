const axios = require('axios'),
      fs   = require('fs'),
      path = require('path');

const dataUrl = "https://ct.cloudflare.com/data/total";

axios.get(dataUrl)
  .then( response => {

    const count = response.data;
    const asof = new Date().toISOString().slice(0, 10);
    const countString = JSON.stringify({count, asof}, false, 2);
    const dataPath = path.join(__dirname, '..', 'data', 'certcount.json');
    
    fs.writeFileSync(dataPath, countString);
  })
  .catch(error => {
    console.log(error)
  });