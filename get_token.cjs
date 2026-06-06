const https = require('https');
const querystring = require('querystring');

const clientId = '0acb3b91d24645ce956c8f48f354fc9d';
const clientSecret = '8d4ada452190405cb7ef64f52a71da87';
const code = 'AQBPTT29gATiyPkUfeyHvemrVFbID0nq4U-V2qNqCI-XCYKtAajSDiJ5ULVG66LNV-fIsPqhg1RK1xRhgoHFzD6N_BroSwKechaZ-EKfkerXSykjsCjHxta0UkwLqo5KZofdv02Gve6FBFq9qfUcs1SBzm74zKoGI2Y-RjtQEyD2wBQ0_jjQvDIuEi9f8-qQZxjVnJzphhBq3ltvnGN4trBWM7myn6Ae_JYRoyML';
const redirectUri = 'https://google.com';

const postData = querystring.stringify({
  grant_type: 'authorization_code',
  code: code,
  redirect_uri: redirectUri
});

const options = {
  hostname: 'accounts.spotify.com',
  port: 443,
  path: '/api/token',
  method: 'POST',
  headers: {
    'Authorization': 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64'),
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': postData.length
  }
};

const req = https.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    console.log('Response:', data);
  });
});

req.on('error', (e) => {
  console.error(e);
});

req.write(postData);
req.end();
