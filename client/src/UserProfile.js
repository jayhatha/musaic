import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    margin: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  button: {
    margin: theme.spacing.unit * 1
  }
});


class UserProfile extends Component {

	constructor(props) {
		super(props)
		this.state = {
			playlists: []
		}
	}

	componentDidMount() {
		const url = '/playlist/user/' + this.props.user._id;
		axios.get(url).then((result) => {
			console.log('AND WE BACK', result.data);
			this.setState({
				playlists: result.data
			})
		});
	}

	render() {
		const playlistsMapped = this.state.playlists.map((playlist) => {
			return (
				<Paper className="paper">
					<img src={playlist.imageUrl} alt="playlist-image" width="200px" />
					<h3>Untitled Playlist</h3>
				</Paper>
			)
		});

		return (
			<div className="root">
				<Paper className="paper">
			  		<p>Hello, {this.props.user.name}!</p>
			  		{/* <a onClick={this.props.logout}>LOG OUT</a> */}
			  	</Paper>
			  	{playlistsMapped}
			</div>
		)
	}
};

export default UserProfile;
