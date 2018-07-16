const mongoose = require('mongoose');

// this makes a new schema for a collection
const playlistSchema = new mongoose.Schema({
    name: String,
    description: String,
    tags: Array,
    genres: Array,
    imageUrl: String,
    songs: Array,
    colorData: Array
});

// make a new model from that Schema
const Playlist = mongoose.model('Playlist', playlistSchema);

<<<<<<< HEAD
module.exports = Playlist;
=======
module.exports = Playlist;
>>>>>>> 5566c9d92a41458733fe874b456dd7ad115cd866
