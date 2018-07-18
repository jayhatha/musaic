import React, { Component } from 'react';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ColorChart from './ColorChart';
import {Link} from 'react-router-dom';
import cookie from 'react-cookie'
import UpdatePlaylist from './UpdatePlaylist';

class Playlist extends Component {

  constructor(props) {
    super(props)
    this.handleFaveClick = this.handleFaveClick.bind(this);
    this.toggleUpdateForm = this.toggleUpdateForm.bind(this);
    this.sendPlaylistToSpotify = this.sendPlaylistToSpotify.bind(this)
    this.state = {
      user: this.props.user,
      playlist: null,
      name: '',
      description: '',
      tags: [],
      genres: [],
      imageURL: '',
      colorData: [],
      updateForm: false
    }
  }

  componentWillMount() {
    if(this.props.isFave === 'true') {
      const url = '/playlist/' + this.props.match.params.id;
      axios.get(url).then((playlist) => {
        console.log('got the playlist, here ya go', playlist.data);
        this.setState({
          playlist: playlist.data,
          name: playlist.data.name,
          description: playlist.data.description,
          tags: playlist.data.tags,
          genres: playlist.data.genres,
          imageURL: playlist.data.imageUrl,
          colorData: playlist.data.colorData,
          songs: playlist.data.songs
        });
      });
    }
    else {
      this.setState({
        playlist: this.props.playlist,
        name: '',
        description: '',
        genres: this.props.genres,
        imageURL: this.props.imgURL,
        colorData: this.props.colors,
        songs: this.props.playlist
      });
    }
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
      colorData: this.props.colors
    }).then(result => {
      console.log('AND WE BACK', result);
    }).catch(err => {
      console.log('UH OH', err);
    })
  }

  sendPlaylistToSpotify(e) {
    let sfyUserToken = cookie.load('ACCESS_TOKEN');
    if (!sfyUserToken) {
      // change this URL in production
      () => {window.location = 'http://localhost:8888/login/'}
      let sfyUserToken = cookie.load('ACCESS_TOKEN');
    }
    if (this.state.playlist) {
    let sfyUserId;
    let playlistId;
    console.log(this.state.playlist.songs, this.state.playlist.songs[0].uri);
    var playlistTest = [];
    let playlistTracks = this.state.playlist.songs.map((song) => playlistTest.push(song.uri));
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
    this.setState({ updateForm: !this.state.updateForm }, console.log(this.state.updateForm));
  }

  render() {
    let tracks, name, genres, description, imgUrl, colors;
    let faveBtn = (this.props.isFave === 'true') ? '' :
    <Button onClick={this.handleFaveClick} variant="contained" color="primary">Add Playlist to Favorites</Button>;

    tracks = (this.state.playlist) ? this.state.songs.map((track) => {
      return <p>{track.name} - {track.artists[0].name}</p>
    }) : '';

    name = (this.state.playlist) ? this.state.name : '';
    genres = (this.state.playlist) ? this.state.genres : '';
    description = (this.state.playlist) ? this.state.description : '';
    imgUrl = (this.state.playlist) ? this.state.imageURL : '';
    colors = (this.state.playlist) ? this.state.colorData : '';

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
            {faveBtn}
            <Button variant="text" onClick={this.sendPlaylistToSpotify}>Send Playlist to Spotify</Button>
            <Button variant="text" onClick={this.toggleUpdateForm} >Edit Playlist</Button>
            <Link to="/profile"><Button variant="contained" color="primary">Back to Profile</Button></Link>

          </Paper>
        </div>
      );
    }
  }
}

export default Playlist;
