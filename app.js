require('dotenv').config();
const express = require('express')
const https = require('https')

// Remove CURL as volnurable part nad also only temporary use here
//var curl = require('curlrequest');

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

app.get('/ai', (req, res) => {
/*
	var options = {
  host: 'https://api.einstein.ai/v2/language',
  //port: 80,
  path: '/sentiment',
  method: 'POST',
  headers: {
  			'Authorization': 'Bearer 2Y22M3W3DQMXD3HOMF22PRMWIFFVSJLT4NJHCFEECL7AHJR5ZVOCRALO3RMNVIY2HHAOBQR3TRZ4HMZEYHVVLQYOVVCTFE34W4WRNEA',
	    		'Content-Type': 'multipart/form-data',
	    		'Cache-Control': 'no-cache'
	       }  
	};

**/
	var formData = {
    	modelId: 'CommunitySentiment',
    	document: 'the presentation was great and I learned a lot'
	}

	const postData = "{modelId: 'CommunitySentiment', document: 'the presentation was great and I learned a lot'}";

	var options = { url: 'https://api.einstein.ai',
		prototcol: 'https',
	    method: 'POST',
	    path: '/v2/language/sentiment',
		headers: {
  			'Authorization': 'Bearer P6IH6NM56WPVQVEEBPI2Z6P4RWD356D7W6FARTGU3TXMEYIA3JU7FGPNNQDBESZQNDHSD2KUWIB23X2NVU7N3FD6WYV5BBWTSJCUIXI',
	    		'Content-Type': 'multipart/form-data',
	    		'Cache-Control': 'no-cache'
	       }
		};


		const auth_req = https.request(options, (auth_res) => {
	  		console.log('statusCode: ${auth_res.statusCode}')

	  		auth_res.on('data', (d) => {
	    		process.stdout.write(d)
	  		})
		})

		auth_req.on('error', (error) => {
	  		console.error(error)
		})

		auth_req.write(postData)
		auth_req.end()

	    //data: {'modelId': 'CommunitySentiment', 'document': 'the presentation was great and I learned a lot'}  
	    //data: 'modelId=CommunitySentiment&document=the presentation was great and I learned a lot',

/*
	var request = https.request(options, function (rest) {
	    var responseString = "";

	    rest.on("data", function (data) {
	        responseString += data;
	        // save all the data from response
	    });
	    rest.on("end", function () {
	        console.log(responseString); 
	        // print to console when response ends
	    });
	});	    

	request.write(postData);
	request.end();
*/

/*
	curl.request(options, function (err, parts) {
    	parts = parts.split('\r\n');
    	var data = parts.pop()
      		, head = parts.pop();
      	console.log('ERROR:' + err);	
    	console.log('RESULT: ' + data);  
	});
*/	
/*
	const auth_req = https.request(options, function(rest) {
  		console.log('STATUS: ' + rest.statusCode);
  		console.log('HEADERS: ' + JSON.stringify(rest.headers));
  		rest.setEncoding('utf8');
  		rest.on('data', function (chunk) {
    		console.log('BODY: ' + chunk);
  		});
	}).end();
*/
/*
	const auth_req = https.request(options, (aires) => {
	  		console.log(aires);

	  		res.send('Hello World!'+aires);
		});
	auth_req.on('error', (error) => {
	  		console.error(error)
	});
	*/
})

app.get('/', (req, res) => res.sendFile(path + "index.html"))

app.use('/static', express.static('public'))

// Start OAUTH requet chain
app.get('/sfauth', (req, res) => {
	console.log("SF_CLIENT_SECRET=" + SF_CLIENT_SECRET);

	SF_AUTH_ENDPOINT = SF_DEVAUTH_ENDPOINT + "/authorize";
	// Authorize URL
	var oauthURL = SF_AUTH_ENDPOINT + "?response_type=code&client_id=" + SF_CLIENT_ID +
		"&redirect_uri=" + SF_REDIRECT_URI + "&display=page";

    console.log("redirecting: " + oauthURL);

    res.redirect(oauthURL);
    res.end();

})

// Listen for SF Authorization Code response
app.get('/oauth/_callback', (req, res) => {

	console.log("/oauth/_callback" + req.method);
	console.log("## Code:"+req.query.code);

	if (req.query.code){

		var authURL = SF_DEVAUTH_ENDPOINT + "/token";

		// Set Data Payload for SF OAuth to start
		const data = JSON.stringify({
	  		code: req.query.code,
	  		grant_type: 'authorization_code',
	  		client_id: SF_CLIENT_ID,
	  		client_secret: SF_CLIENT_SECRET,
	  		redirect_uri: SF_REDIRECT_URI
		})

		// Set POST method & headers
		const options = {
	  		hostname: SF_AUTH_ENDPOINT,
	  		//port: 443,
	  		path: authURL, // auth2/token
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


	}

})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))