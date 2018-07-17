import React from 'react';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import {Link} from 'react-router-dom';

const handleClick = (playlist) => {
	const url = '/playlist/' + playlist._id;
	axios.get(url).then((result) => {
		console.log('got the playlist, here ya go', result.data);
	});
}

const PlaylistCard = (props) => {
	const url = '/playlists/' + props.playlist._id;
	return (

			<Paper onClick={() => handleClick(props.playlist)} className="paper">
				<img src={props.playlist.imageUrl} alt="playlist-image" width="300px" />
				<h3>Untitled Playlist</h3>
			</Paper>
	);
}

export default PlaylistCard;