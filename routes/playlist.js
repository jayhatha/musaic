require('dotenv').config();
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User');
const Playlist = require('../models/Playlist');
var request = require('request'); // "Request" library

// post /playlist - creates new playlist
router.post('/', (req, res) => {
	console.log('HIT PLAYLIST POST ROUTE');
	Playlist.create({
		name: '',
		description: '',
		tags: [],
		genres: req.body.genres,
		imageUrl: req.body.imageURL,
		songs: req.body.playlist,
		colorData: req.body.colorData,
		userID: req.body.user._id
	}, function(err, playlist) {
		if(err) {
			console.log('Error creating playlist', err)
		}
		else {
			console.log('SUCCESS creating playlist!', playlist.userID)
		}
	})
}); 

// get /playlist/:id - gets specific playlist
router.get('/:id', (req, res) => {
	Playlist.findOne({_id: req.params.id}, (err, playlist) => {
		if(err) {
			console.log('Error finding playlist', err);
		}
		else {
			res.json(playlist);
		}
	})
});

// get /playlist/user/:userID - gets users playlists
router.get('/user/:userID', (req, res) => {
	console.log('HIT GET USER PLAYLISTS ROUTE')
	Playlist.find({userID: req.params.userID}, (err, playlist) => {
		if (err) {
			console.log('Error finding playlist', err)
		}
		else {
			res.json(playlist);
		}
	})
}); 


module.exports = router;
