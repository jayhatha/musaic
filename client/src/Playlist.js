import React, { Component } from 'react';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ColorChart from './ColorChart';
import {Link} from 'react-router-dom';
import UpdatePlaylist from './UpdatePlaylist';

class Playlist extends Component {

  constructor(props) {
    super(props)
    this.handleFaveClick = this.handleFaveClick.bind(this);
    this.toggleUpdateForm = this.toggleUpdateForm.bind(this);
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
            <Button variant="text" onClick={this.toggleUpdateForm} >Edit Playlist</Button>
            <Link to="/profile"><Button variant="contained" color="primary">Back to Profile</Button></Link>
          </Paper>
        </div>
      ); 
    }   
  }
}

export default Playlist;
