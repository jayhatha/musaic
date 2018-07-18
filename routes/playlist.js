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
		name: req.body.name,
		description: req.body.description,
		tags: req.body.tags,
		genres: req.body.genres,
		imageUrl: req.body.imageURL,
		songs: req.body.playlist,
		colorData: req.body.colorData,
		userID: req.body.user._id,
		spfyAtts: req.body.spfyAtts
	}, function(err, playlist) {
		if(err) {
			console.log('Error creating playlist', err)
		}
		else {
			console.log('SUCCESS creating playlist!', playlist.userID)
			res.json(playlist);
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

// put /playlist/:id - update a user's playlist
router.put('/:id', (req, res) => {
	console.log('Hit the PUT user playlist route');
	Playlist.findByIdAndUpdate({_id: req.params.id}, {
		name: req.body.name, 
		description: req.body.description, 
		tags: req.body.tags
	},{new: true}, (err, playlist) => {
		if (err) {
			console.log("Error finding playlist", err);
		} else {
			res.json(playlist);
			console.log(playlist + " sent");
			
		}
	})
});

// delete /playlist/:id - delete a user's playlist
router.delete('/:id', (req, res) => {
	console.log('HIT DELET ROUTE');
	Playlist.remove({_id: req.params.id}, (err, result) => {
		if(err) {
			console.log('Error removing playlist');
		}
		else {
			res.sendStatus(200);
		}
	});
});


module.exports = router;
