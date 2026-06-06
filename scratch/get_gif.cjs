const https = require('https');

https.get('https://tenor.com/view/nyanbot-funbots-fun-bots-nft-gif-1145334722956555575', (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    const match = data.match(/content="(https:\/\/media\.tenor\.com\/[^"]+\.gif)"/);
    if (match) {
      console.log('GIF_URL:', match[1]);
    } else {
      console.log('Not found in content, looking for other media links...');
      const match2 = data.match(/src="(https:\/\/media\.tenor\.com\/[^"]+\.gif)"/);
      if (match2) console.log('GIF_URL:', match2[1]);
      else console.log('Could not find GIF URL.');
    }
  });
}).on('error', (e) => {
  console.error(e);
});
