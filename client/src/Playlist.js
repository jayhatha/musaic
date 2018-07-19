import React, { Component } from 'react';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ColorChart from './ColorChart';
import AttsChart from './AttsChart';
import {Link, withRouter}  from 'react-router-dom';
import cookie from 'react-cookie'
import UpdatePlaylist from './UpdatePlaylist';
import './App.css';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    margin: theme.spacing.unit * 2,
    height: '100%',
    color: theme.palette.text.secondary,
    textAlign: 'center'
  },
  button: {
    margin: theme.spacing.unit * 2
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  }
})

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
    axios.post('/playlist', this.state).then(playlist => {
      console.log('SAVED PLAYLIST', playlist);
      this.setState({
        isFave: 'true',
        playlist: playlist.data,
        name: playlist.data.name,
        description: playlist.data.description,
        tags: playlist.data.tags,
        genres: playlist.data.genres,
        imageURL: playlist.data.imageUrl,
        colorData: playlist.data.colorData,
        songs: playlist.data.songs,
        spfyAtts: playlist.data.spfyAtts
      });
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
      console.log('no spotify cookie found');
      var spotifyLoginWindow = window.open('http://localhost:8888/login/', "width=400, height=600");
    } else {
    sfyUserToken = cookie.load('ACCESS_TOKEN');
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
    }

  toggleUpdateForm(e) {
    e.preventDefault();
    console.log("You clicked the update form button!");
    this.setState({ updateForm: !this.state.updateForm });
  }

  render() {

    const {classes} = this.props;

    let addOrRemoveBtn = (this.state.isFave === 'true') ? <Button className="btn" onClick={this.handleRemoveFaveClick} variant="contained" color="primary">Remove Playlist from Favorites</Button> :
    <Button className="btn" onClick={this.handleFaveClick} variant="contained" color="primary">Add Playlist to Favorites</Button>;

    let tracks = this.state.songs.map((track) => {
      return <p><strong>{track.name}</strong> - <em>{track.artists[0].name}</em></p>
    });

    let name = this.state.name;
    let genres = this.state.genres;
    let description = this.state.description;
    let imgUrl = this.state.imageURL;
    let colors = this.state.colorData;
    let spfyAtts = this.state.spfyAtts;

    const valence = Math.floor(spfyAtts[0] * 100).toString();
    const mode = (spfyAtts[1] >= 0.5) ? 'Major' : 'Minor';
    const energy = Math.floor(spfyAtts[2] * 100).toString();
    const danceability = Math.floor(spfyAtts[3] * 100).toString();

    const color1 = colors[0][0];
    const color2 = (colors[1]) ? colors[1][0] : '#fff';
    const color3 = (colors[2]) ? colors[2][0] : '#fff';

    const backgroundStyle = {
      background: 'linear-gradient(to bottom right, '+ color1 + ', ' + color2 + ', ' + color3 + ')',
      backgroundSize: 'cover',
      backgroundPosition: 'fixed',
      padding: '4em 5em'
    }


    if (this.state.updateForm === true) {
      return (
        <div>
          <Paper>
            <UpdatePlaylist playlist={this.state.playlist}
                            name={this.state.name}
                            description={this.state.description}
                            tags={this.state.tags}
                            genres={this.state.genres}
                            updateForm={this.state.updateForm}
            />
          </Paper>
        </div>
      )
    } else {
      return (
        <div className="playlist-container" style={backgroundStyle}>
          <div className="playlist-grid">
            <div className="playlist-heading">
              <h1>Your Spotify-Generated Playlist:</h1>
              <h3>{name}</h3>
              <p>Genres: {genres}</p>
              <p>Description: {description}</p>
            </div>
            <div className="playlist-image">
              <img src={imgUrl} width="400px" alt="playlist-image" />
              <Link className="profile-button" to="/profile"><Button className="btn" variant="contained" color="primary">Back to Profile</Button></Link>
            </div>
            <div className="playlist-tracks">
              <h2>Tracks</h2>
              <hr />
              {tracks}
              {addOrRemoveBtn}
              <Button className="edit-button btn" color="primary" variant="contained" onClick={this.toggleUpdateForm}>Edit Playlist</Button>
              <Button className="btn spfy-btn" variant="contained" onClick={this.sendPlaylistToSpotify}>Send Playlist to Spotify</Button>
            </div>
            <div className="playlist-colorChart">
              <h2>Image Data</h2>
              <hr />
              <ColorChart colors={colors} />
            </div>
            <div className="playlist-attsChart">
              <AttsChart spfyAtts={spfyAtts} />
              <p className="valenceP"><em>Valence: </em>{valence}%</p>
              <p className="energyP"><em>Energy: </em>{energy}%</p>
              <p className="danceabilityP"><em>Danceability: </em>{danceability}%</p>
              <p className="modeP"><em>Mode: </em>{mode}</p>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default withRouter(withStyles(styles)(Playlist));
