const https = require('https');
const fs = require('fs');

const url = 'https://raw.githubusercontent.com/google/fonts/main/ofl/parisienne/Parisienne-Regular.ttf';
const file = fs.createWriteStream('public/signature.ttf');

function download(u) {
  https.get(u, function(response) {
    if (response.statusCode === 301 || response.statusCode === 302) {
      download(response.headers.location);
    } else {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log('Done downloading. Size:', fs.statSync('public/signature.ttf').size);
      });
    }
  }).on('error', function(err) {
    console.error(err);
  });
}

download(url);
