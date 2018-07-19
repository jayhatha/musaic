import React from 'react';
import Paper from '@material-ui/core/Paper';
import {Link} from 'react-router-dom';
import './App.css';

const PlaylistCard = (props) => {
	const url = '/playlist/' + props.playlist._id;
	return (
		<Link to={{pathname: url, state: {
			playlist: props.playlist,
			name: props.playlist.name,
			description: props.playlist.description,
			tags: props.playlist.tags,
			genres: props.playlist.genres,
			imageURL: props.playlist.imageUrl,
			colorData: props.playlist.colorData,
			songs: props.playlist.songs,
			spfyAtts: props.playlist.spfyAtts
		}}}>
			<Paper className="paper">
				<img src={props.playlist.imageUrl} alt="playlist-image" width="300px" />
				<h3>{props.playlist.name}</h3>
			</Paper>
		</Link>
	);
}

export default PlaylistCard;
