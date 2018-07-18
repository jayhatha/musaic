import React, { Component } from 'react';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ColorChart from './ColorChart';
import AttsChart from './AttsChart';
import {Link} from 'react-router-dom';
import cookie from 'react-cookie'
import UpdatePlaylist from './UpdatePlaylist';
import {withRouter} from 'react-router-dom';

class Playlist extends Component {

  constructor(props) {
    super(props)
    this.handleFaveClick = this.handleFaveClick.bind(this);
    this.handleRemoveFaveClick = this.handleRemoveFaveClick.bind(this);
    this.toggleUpdateForm = this.toggleUpdateForm.bind(this);
    this.sendPlaylistToSpotify = this.sendPlaylistToSpotify.bind(this)
    this.state = {
      user: this.props.user,
      isFave: this.props.isFave,
      updateForm: false,
      playlist: this.props.location.state.playlist,
      name: this.props.location.state.name,
      description: this.props.location.state.description,
      tags: this.props.location.state.tags,
      genres: this.props.location.state.genres,
      imageURL: this.props.location.state.imageURL,
      colorData: this.props.location.state.colorData,
      songs: this.props.location.state.songs,
      spfyAtts: this.props.location.state.spfyAtts
    }
  }

  handleFaveClick(e) {
    e.preventDefault();
    this.setState({isFave: 'true'});
    axios.post('/playlist', this.state).then(result => {
      console.log('SAVED PLAYLIST', result);
    }).catch(err => {
      console.log('UH OH', err);
    })
  }

  handleRemoveFaveClick(e) {
    e.preventDefault();
    const url = '/playlist/' + this.state.playlist._id;
    axios.delete(url).then((result) => {
      this.props.history.push({pathname: '/profile'});
    })
  }

  sendPlaylistToSpotify(e) {
    let sfyUserToken = cookie.load('ACCESS_TOKEN');
    if (!sfyUserToken) {
      console.log("NO SFYTOKEN");
      // change this URL in production
      window.location = 'http://localhost:8888/login/';
      sfyUserToken = cookie.load('ACCESS_TOKEN');
    }
    if (this.state.playlist) {
    let sfyUserId;
    let playlistId;
    var playlistTest = [];
    let playlistTracks = this.state.songs.map((song) => playlistTest.push(song.uri));
    playlistTracks = playlistTest;

    console.log(playlistTracks)
    console.log('token is ' + sfyUserToken)
    axios.defaults.headers.common['Authorization'] = "Bearer " + sfyUserToken;
    axios.get('https://api.spotify.com/v1/me').then(results => {
      let sfyUserId = results.data.id;
      axios.defaults.headers.common['Authorization'] = "Bearer " + sfyUserToken;
      axios.post('https://api.spotify.com/v1/users/' +  sfyUserId + '/playlists', {
        name: 'test playlist',
        public: true,
      }).then((response) => {
        let playlistId = response.data.id
        axios.defaults.headers.common['Authorization'] = "Bearer " + sfyUserToken;
        axios.post('https://api.spotify.com/v1/users/' +  sfyUserId + '/playlists/' + playlistId + '/tracks', {
          uris: playlistTracks
        }).then(console.log('okay, we added a playlist and some tracks'))
      })
      })
      }
    }

  toggleUpdateForm(e) {
    e.preventDefault();
    console.log("You clicked the update form button!");
    this.setState({ updateForm: !this.state.updateForm });
  }

  render() {
    let addOrRemoveBtn = (this.state.isFave === 'true') ? <Button onClick={this.handleRemoveFaveClick} variant="contained" color="primary">Remove Playlist from Favorites</Button> :
    <Button onClick={this.handleFaveClick} variant="contained" color="primary">Add Playlist to Favorites</Button>;

    let tracks = this.state.songs.map((track) => {
      return <p>{track.name} - {track.artists[0].name}</p>
    });

    let name = this.state.name;
    let genres = this.state.genres;
    let description = this.state.description;
    let imgUrl = this.state.imageURL;
    let colors = this.state.colorData;
    let spfyAtts = this.state.spfyAtts;

    console.log('Playlist State', this.state);
    console.log('Playlist Location State', this.props);

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
            <h3>{name}</h3>
            <p>Genres: {genres}</p>
            <p>Description: {description}</p>
            <img src={imgUrl} width="300px" alt="playlist-image" />
            {tracks}
            <ColorChart colors={colors} />
            <AttsChart spfyAtts={spfyAtts} />
            {addOrRemoveBtn}
            <Button variant="text" onClick={this.toggleUpdateForm}>Edit Playlist</Button>
            <Button variant="text" onClick={this.sendPlaylistToSpotify}>Send Playlist to Spotify</Button>
            <Link to="/profile"><Button variant="contained" color="primary">Back to Profile</Button></Link>
          </Paper>
        </div>
      );
    }
  }
}

export default withRouter(Playlist);
