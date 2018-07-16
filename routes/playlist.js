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
			console.log('SUCCESS!', playlist._id)
			User.findByIdAndUpdate(req.body.user, {
				$push: {playlistIds: playlist._id}
			}, (err, user) => {
				if(err) {
					console.log('Error finding user', err)
				}
				else {
					console.log('User success', user)
				}
			})
		}
	})
}); 

// get /playlist/user/:userID - gets users playlists
router.get('/user/:userID', (req, res) => {
	console.log('HIT GET USER PLAYLISTS ROUTE')
	User.findById(req.params.userID, (err, user) => {
		if (err) {
			console.log('Error finding user', err)
		}
		else {

		}
	})
}); 


module.exports = router;
