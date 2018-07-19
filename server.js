require('dotenv').config();
let express = require('express')
let request = require('request')
let querystring = require('querystring')

let app = express();
app.use(express.static(`${__dirname}/client/public`))

let redirect_uri = 'http://localhost:8888/callback'

app.get('/login', function(req, res) {
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


let port = 8888
console.log(`Listening on port ${port}. Go /login to initiate authentication flow.`)
app.listen(port)
