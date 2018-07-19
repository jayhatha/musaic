require('dotenv').config();
const express = require('express');
const bp = require('body-parser');
const mongoose = require('mongoose');
const expressJWT = require('express-jwt');
const auth = require('./routes/auth');
const playlist = require('./routes/playlist');
const locked = require('./routes/locked');
var querystring = require('querystring');
let request = require('request')
var cloudinary = require('cloudinary');

const port = process.env.port || 3000;

const app = express();

app.use(bp.json({ limit: '50mb' }));
app.use(bp.urlencoded({ extended: false, limit: '50mb' }));

mongoose.connect('mongodb://localhost/moodMusic');

//ADDED config cloudinary (want to add to route once created)
cloudinary.config({
    cloud_name: 'dieaqkurh',
    api_key: process.env.REACT_APP_CLOUDINARY_API_KEY,
    api_secret: process.env.REACT_APP_CLOUDINARY_API_SECRET
});

app.use(express.static(`${__dirname}/client/build`))


app.use('/auth', auth);
app.use('/playlist', playlist);
app.use('/locked', expressJWT({ secret: process.env.JWT_SECRET }).unless({ method: 'POST' }), locked);

let redirect_uri = 'http://localhost:3000/callback'

app.get('/spotifylogin', function(req, res) {
  console.log('hit the sfy login route ... should redirect')
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: process.env.REACT_APP_SPOTIFY_KEY,
      scope: 'user-read-private user-read-email playlist-modify-public',
      redirect_uri
    }))
})

app.get('/callback', function(req, res) {
  let code = req.query.code || null
  let authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri,
      grant_type: 'authorization_code'
    },
    headers: {
      'Authorization': 'Basic ' + (new Buffer(
        process.env.REACT_APP_SPOTIFY_KEY + ':' + process.env.REACT_APP_SPOTIFY_SECRET
      ).toString('base64'))
    },
    json: true
  }
  request.post(authOptions, function(error, response, body) {
    console.log('heyo')
    var access_token = body.access_token
    res.cookie('ACCESS_TOKEN', access_token);
    res.sendFile(`${__dirname}/client/public/closewindow.html`)
  })
})

//creating the test route
app.post('/cloudinary-data', function (req, res) {
    console.log('HIT CLOUD_DATA POST ROUTE')
    //NEED name delete 'something'
    cloudinary.v2.api.resource(req.body.imgPublicId, { colors: true },
        function (error, result) {
            res.json(result);
        });
});

app.get('*', (req, res) => {
    console.log('wildcard route hit')
    res.sendFile(`${__dirname}/client/build/index.html`);
});

const server = app.listen(port, () => {
    console.log('You\'re listening to the smooooth sounds of port ' + port)
});

module.exports = server;
