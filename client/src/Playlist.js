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
import SpotifyModal from './SpotifyModal'

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
      spfyAtts: this.props.location.state.spfyAtts,
      spotLink: ""
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
    var playlistArray = [];
    let playlistTracks = this.state.songs.map((song) => playlistTest.push(song.uri));
    playlistTracks = playlistArray;
    axios.defaults.headers.common['Authorization'] = "Bearer " + sfyUserToken;
    axios.get('https://api.spotify.com/v1/me').then(results => {
      let sfyUserId = results.data.id;
      axios.defaults.headers.common['Authorization'] = "Bearer " + sfyUserToken;
      axios.post('https://api.spotify.com/v1/users/' +  sfyUserId + '/playlists', {
        name: this.state.playlist.name || 'untitled playlist',
        public: true,
      }).then((response) => {
        let playlistId = response.data.id
        axios.defaults.headers.common['Authorization'] = "Bearer " + sfyUserToken;
        axios.post('https://api.spotify.com/v1/users/' +  sfyUserId + '/playlists/' + playlistId + '/tracks', {
          uris: playlistTracks
        }).then((response) =>{
          this.setState({
            spotLink: 'https://open.spotify.com/user/' + sfyUserId + '/playlist/' + playlistId
          }, this.child.onOpenModal())
        }).catch(err => console.log(err))
      }).catch(err => console.log(err))
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
        <div className={classes.root}>
          <Paper className={classes.paper}>
            <h1>Your Spotify-Generated Playlist:</h1>
            <h3>{name}</h3>
            <p>Genres: {genres}</p>
            <p>Description: {description}</p>
            <img src={imgUrl} width="300px" alt="playlist-image" />
            {tracks}
            <ColorChart colors={colors} />
            <AttsChart spfyAtts={spfyAtts} />
            <SpotifyModal showCloseIcon='false' onRef={ref => (this.child = ref)} image={this.state.imageURL} spotLink={this.state.spotLink}/>
            {addOrRemoveBtn}
            <Button className="edit-button" variant="text" onClick={this.toggleUpdateForm}>Edit Playlist</Button>
            <Button variant="text" onClick={this.sendPlaylistToSpotify}>Send Playlist to Spotify</Button>
            <Link className="profile-button" to="/profile"><Button variant="contained" color="primary">Back to Profile</Button></Link>
          </Paper>
        </div>
      );
    }
  }
}

export default withRouter(withStyles(styles)(Playlist));
