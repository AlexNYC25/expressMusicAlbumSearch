// libraries
const fs = require('fs');
const express = require('express');

const port = 3000;

// variable to test is authentication has been cached
let cached_auth = null;

// serve static files
app.use('/album-art', express.static('album-art'));
app.use('/css', express.static('css'));

// credentials
const credentials = require('./auth/credentials.json')

// spotify endpoint
const SPOTIFY_TOKEN = 'https://accounts.spotify.com/api/token';

// post data object for access token
let post_data = {
    "client_id":credentials.client_id,
    "client_secret":credentials.client_secret,
    "grant_type":"client_credentials"
}

// converted string of post data object
let stringPostData = querystring.stringify(post_data);

// options object for request
let options = {
    "method":"POST",
    "headers": {
        "Content-Type": "application/x-www-form-urlencoded",
        "Content-Length": stringPostData.length
    }
}


// time object for current time
let auth_sent_time = new Date();

const received_authentication = function(authentication_res, user_input, auth_sent_time, res){
    authentication_res.setEncoding("utf8");
    let body = "";
    authentication_res.on("data", function(chunk) {body += chunk;});
    authentication_res.on("end", function(){
        let spotify_auth = JSON.parse(body);

        spotify_auth.expiration = auth_sent_time.getTime() + (3600 * 1000);
        create_access_token_cache(spotify_auth);
    })
}

const create_access_token_cache = function(spotify_auth){
    tempStr = JSON.stringify(spotify_auth);
    fs.watchFile('./auth/authentication-res.json', tempStr, (err) => {
        console.log(err);
    });
}

let authenticationRequest = https.request(SPOTIFY_TOKEN, options, function(authentication_res) {
    console.log('Creating a new access token');
    received_authentication(authentication_res, "user_input", auth_sent_time, "res");
})

const app = express();

app.set('views', './views')
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    //
    res.render('index.pug')
})

app.get('/search', (req, res) => {
    let artist = req.query.q;
    console.log(artist);
})

app.listen(port, () => {
    console.log(`App listenting on port ${port}`)
})

