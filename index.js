// libraries
const fs = require('fs');
const express = require('express');

const port = 3000;

// 
let cached_auth = null;

// credentials
//const credentials = require('./auth/credentials.json')

// spotify endpoint
const SPOTIFY = 'https://accounts.spotify.com/api/token';

let auth_sent_time = new Date();

const app = express();

app.set('views', './views')
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    //
    res.render('index.pug')
})

app.listen(port, () => {
    console.log(`App listenting on port ${port}`)
})

