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
		colorData: req.body.colorData
	}, function(err, playlist) {
		if(err) {
			console.log('FAILURE!', err)
		}
		else {
			console.log('SUCCESS!', playlist._id)
			User.findByIdAndUpdate(req.body.user, {
				$push: {playlistIds: playlist._id}
			}, function(err, user) {
				if(err) {
					console.log('User error', err)
				}
				else {
					console.log('User success', user)
				}
			})
		}
	})

}); 


module.exports = router;
