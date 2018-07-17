import React from 'react';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import {Link} from 'react-router-dom';

const PlaylistCard = (props) => {
	const url = '/playlist/' + props.playlist._id;
	return (
		<Link to={url}>
			<Paper className="paper">
				<img src={props.playlist.imageUrl} alt="playlist-image" width="300px" />
				<h3>Untitled Playlist</h3>
			</Paper>
		</Link>
	);
}

export default PlaylistCard;