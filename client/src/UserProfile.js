import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import PlaylistCard from './PlaylistCard';

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

	componentWillMount() {
		if(this.props.user) {
			const url = '/playlist/user/' + this.props.user._id;
			axios.get(url).then((result) => {
				this.setState({playlists: result.data});
			});
		}
	}

	render() {
		const playlistsMapped = this.state.playlists.map((playlist) => {
			return <PlaylistCard playlist={playlist} spfyAtts={this.props.spfyAtts} />
		})

		return (
			<div className="root">
				{/* <Paper className="paper"> */}
			  		<p className="hello" >Hello, {this.props.user.name}!</p>
			  		{/* <a onClick={this.props.logout}>LOG OUT</a> */}
			  	{/* </Paper> */}
			  	{playlistsMapped}
			</div>
		)
	}
};

export default withStyles(styles)(UserProfile);
