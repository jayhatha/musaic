import React, { Component } from 'react';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import UpdatePlaylist from './UpdatePlaylist';

class Playlist extends Component {

  constructor(props) {
    super(props)
    this.handleFaveClick = this.handleFaveClick.bind(this);
    this.toggleUpdateForm = this.toggleUpdateForm.bind(this);
    this.state = {
      playlist: null,
      updateForm: false
    }
  }

  componentWillMount() {
    const url = '/playlist/' + this.props.match.params.id;
    axios.get(url).then((playlist) => {
      console.log('got the playlist, here ya go', playlist.data);
      this.setState({ playlist: playlist.data });
    });
  }

  handleFaveClick(e) {
    e.preventDefault();
    axios.post('/playlist', {
      user: this.props.user,
      playlist: this.props.playlist,
      name: '',
      description: '',
      tags: [],
      genres: this.props.genres,
      imageURL: this.props.imgURL,
      songs: this.props.playlist,
      colorData: this.props.colors
    }).then(result => {
      console.log('AND WE BACK', result);
    }).catch(err => {
      console.log('UH OH', err);
    })
  }

  toggleUpdateForm(e) {
    e.preventDefault();
    console.log("You clicked the update form button!");
    this.setState({ updateForm: !this.state.updateForm }, console.log(this.state.updateForm));
  }

  render() {
    let tracks = (this.state.playlist) ? this.state.playlist.songs.map((track) => {
      return <p>{track.name} - {track.artists[0].name}</p>
    }) : '';

    let name = (this.state.playlist) ? this.state.playlist.name : '';
    let genres = (this.state.playlist) ? this.state.playlist.genres : '';
    let description = (this.state.playlist) ? this.state.playlist.description : '';
    let imgURL = (this.state.playlist) ? this.state.playlist.imageUrl : '';

    if (this.state.updateForm == true) {
      return (
        <div className="root">
          <Paper className="paper">
            <UpdatePlaylist />
          </Paper>
        </div>
      )
    } else {
      return (
        <div className="root">
          <Paper className="paper">
            <h1>Your Spotify-Generated Playlist:</h1>
            <Button variant="text" onClick={this.toggleUpdateForm} >Edit Playlist</Button>
            <h3>{name}</h3>
            <p>Genres: {genres}</p>
            <p>Description: {description}</p>
            <img src={imgURL} alt="playlist-image" width="100%" />
            {tracks}
            <Button onClick={this.handleFaveClick} variant="contained" color="primary">Save this Playlist</Button>
            <Link to="/profile"><Button variant="contained" color="primary">Back to Profile</Button></Link>
          </Paper>
        </div>
      );
    }
  }
}

export default Playlist;
