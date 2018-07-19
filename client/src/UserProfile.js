import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import PlaylistCard from './PlaylistCard';
import Grid from '@material-ui/core/Grid';

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
			return (
        <Grid item xs={4}>
          <PlaylistCard playlist={playlist} spfyAtts={this.props.spfyAtts} />
        </Grid>
      )

		})

		return (
			<div className="root">
        <Grid container >
          <Grid item xs={12}>
			  		<p className="hello" >Hello, {this.props.user.name}!</p>
            <p className="saved-text"> Which playlist are you in the moodsic for today? </p>
          </Grid>
        </Grid>
        <Grid container spacing={24} className="playlist-box">
            {playlistsMapped}
        </Grid>
			</div>
		)
	}
};

export default withStyles(styles)(UserProfile);
