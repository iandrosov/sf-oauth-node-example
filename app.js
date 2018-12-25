require('dotenv').config();
const express = require('express')
const https = require('https')

const app = express()
const port = 5000
var path = __dirname + '/views/';

// COnst must be saved in invornment DO NOT chek in
const SF_REDIRECT_URI = process.env.SF_REDIRECT_URI;
const SF_CLIENT_ID=process.env.SF_CLIENT_ID;
const SF_CLIENT_SECRET=process.env.SF_CLIENT_SECRET;

var myAPIKey = process.env.MYAPIKEY;

// Regular const
const SF_DEVAUTH_ENDPOINT = 'https://login.salesforce.com/services/oauth2';
const SF_SBXAUTH_ENDPOINT = 'https://test.salesforce.com/services/oauth2';

let SF_AUTH_ENDPOINT = SF_DEVAUTH_ENDPOINT;
let SF_DEV_LOGIN = 'https://login.salesforce.com';
let SF_SANDBOX_LOGIN = 'https://test.salesforce.com';

//app.get('/', (req, res) => res.send('Hello World!'))

app.get('/', (req, res) => res.sendFile(path + "index.html"))

app.use('/static', express.static('public'))

// Start OAUTH requet chain
app.get('/sfauth', (req, res) => {
	console.log("SF_CLIENT_SECRET=" + SF_CLIENT_SECRET);

	SF_AUTH_ENDPOINT = SF_DEVAUTH_ENDPOINT + "/authorize";

	// Set Data Payload for SF OAuth to start
	const data = JSON.stringify({
	  response_type: 'code',
	  client_id: SF_CLIENT_ID,
	  redirect_uri: SF_REDIRECT_URI,
	  display: 'page'
	})

	// Set POST method & headers
	const options = {
	  hostname: SF_AUTH_ENDPOINT,
	  //port: 443,
	  path: '/authorize',
	  method: 'POST',
	  headers: {
	    'Content-Type': 'application/json',
	    'Content-Length': data.length
	  }
	}

	const auth_req = https.request(options, (res) => {
	  console.log('statusCode: ${res.statusCode}')

	  res.on('data', (d) => {
	    process.stdout.write(d)
	  })
	})

	auth_req.on('error', (error) => {
	  console.error(error)
	})

	auth_req.write(data)
	auth_req.end()

})

// Listen for SF Authorization Code response
app.post('/oauth/_callback', (req, res) => {

	console.log("/oauth/_callback" + req.method);
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))