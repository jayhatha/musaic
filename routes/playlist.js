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

// get /playlist/user/:userID - gets users playlists
router.get('/user/:userID', (req, res) => {
	console.log('HIT GET USER PLAYLISTS ROUTE')
	Playlist.find({userID: req.params.userID}, (err, playlist) => {
		if (err) {
			console.log('Error finding user', err)
		}
		else {
			res.json(playlist)
		}
	})
}); 

// put /playlist/user/:userID - update a user's playlist
router.put('/user/:userID', (req, res) => {
	console.log('Hit the PUT user playlist route');
	Playlist.findByIdAndUpdate({id: req.params._id}, {
		name: req.body.name, 
		description: req.body.description, 
		tags: req.body.tags, 
		genres: req.body.genres, 
		songs: req.body.playlist
	},{new: true}, (err, playlist) => {
		if (err) {
			console.log("Error finding playlist", err);
		} else {
			res.json(playlist);
		}
	})
});

// delete /playlist/user/:userID - delete a user's playlist
// router.delete('')

// delete /playlist/user/:userID - delete a song


module.exports = router;
