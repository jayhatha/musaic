require('dotenv').config();
const express = require('express');
const bp = require('body-parser');
const mongoose = require('mongoose');
const expressJWT = require('express-jwt');
const auth = require('./routes/auth');
const locked = require('./routes/locked');

const port = process.env.port || 3000;

const app = express();

app.use(bp.json());
app.use(bp.urlencoded({ extended: false }));

mongoose.connect('mongodb://localhost/moodMusic');

app.use(express.static(`${__dirname}/client/build`));
app.use('/auth', auth);
app.use('/locked', expressJWT({ secret: process.env.JWT_SECRET }).unless({ method: 'POST' }), locked);

app.get('*', (req, res) => {
    res.sendFile(`${__dirname}/client/build/index.html`);
});

const server = app.listen(port, () => {
    console.log('You\'re listening to the smooooth sounds of port ' + port)
});

module.exports = server;
