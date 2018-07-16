import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Playlist from './Playlist';
import axios from 'axios';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});


class Result extends Component {
  constructor(props) {
    super(props)
    this.state = {
      playlist: [],
      spotifyToken: ''
    }
  }

  componentDidMount() {
    this.checkForSpotifyToken()
  }

  checkForSpotifyToken() {
    //Look for Spotify token in local storage
    let spotifyToken = localStorage.getItem('spotifyToken');
    console.log('checking for sfy token')
    if (!spotifyToken || spotifyToken === 'undefined') {
      // There was no token
      // clear out anything weird that might be there
      console.log('no sfy token found')
      localStorage.removeItem('spotifyToken')
      this.setState({
        spotifyToken: '',
      })

      // we're calling the Spotify API on the back end to get a token
      console.log('trying to hit route on back end')
      axios.post('/auth/get/spotify/token').then(results => {
        // put the token in local storage
        console.log(results.data)
        localStorage.setItem('spotifyToken', results.data.access_token);
        this.setState({
          spotifyToken: results.data.access_token,
        })
      }).catch(err => console.log(err))
    }
  }

  render() {
    // const { classes } = props;
    console.log('PLATLIST', this.props.playlist);
    return (
      <div className="root">
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <h1>Results:</h1>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper className="paper">
              <img src={this.props.imgURL} width="100%" ></img>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
              <Paper className="paper">
                <Playlist playlist={this.props.playlist}/>
                <p>Here's a song</p>
                <p>Here's another song</p>
              </Paper>
          </Grid>
        </Grid>
      </div>
    )
  }
}

//Display photo and playlist in this component

export default withStyles(styles)(Result)
