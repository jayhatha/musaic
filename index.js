require('dotenv').config();
const express = require('express');
const bp = require('body-parser');
const mongoose = require('mongoose');
const expressJWT = require('express-jwt');
const auth = require('./routes/auth');
const locked = require('./routes/locked');
var cloudinary = require('cloudinary');

const port = process.env.port || 3000;

const app = express();

app.use(bp.json());
app.use(bp.urlencoded({ extended: false }));

mongoose.connect('mongodb://localhost/moodMusic');

//ADDED config cloudinary (want to add to route once created)
cloudinary.config({
  cloud_name: 'dieaqkurh',
  api_key: process.env.REACT_APP_CLOUDINARY_API_KEY,
  api_secret: process.env.REACT_APP_CLOUDINARY_API_SECRET
});

app.use(express.static(`${__dirname}/client/build`));
app.use('/auth', auth);
app.use('/locked', expressJWT({ secret: process.env.JWT_SECRET }).unless({ method: 'POST' }), locked);

//creating the test route
app.get('/cloudinary-test', function(req, res) {
  //NEED name delete 'something'
  cloudinary.v2.api.resource('qebgunexmg4dtmrhcdpa', {colors: true},
    function(error, result) {
      console.log(result);
      res.json(result);
  });
})

app.get('*', (req, res) => {
    res.sendFile(`${__dirname}/client/build/index.html`);
});

const server = app.listen(port, () => {
    console.log('You\'re listening to the smooooth sounds of port ' + port)
});

module.exports = server;
