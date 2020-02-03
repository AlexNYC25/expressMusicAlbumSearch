const https = require('https');
const request = require('request');

// credentials json file
const credentials = require('./auth/credentials.json')

// spotify endpoint for token
const SPOTIFY_TOKEN = 'https://accounts.spotify.com/api/token';

// headers value
let headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
}

// setting up options for post request
let options = {
    url: SPOTIFY_TOKEN,
    method: 'POST',
    headers: headers,
    form: {'client_id':credentials.client_id, 'client_secret':credentials.client_secret, 'grant_type':'client_credentials' }
}

// main request
request(options, function (error, response, body) {
    if(!error && response.statusCode == 200) {
        console.log(body);
    }
    //console.log(response.statusCode);
    //console.log(response)
})