import React, { Component } from 'react';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ColorChart from './ColorChart';
import AttsChart from './AttsChart';
import {Link} from 'react-router-dom';
import UpdatePlaylist from './UpdatePlaylist';
import {withRouter} from 'react-router-dom';
import './App.css';

class Playlist extends Component {

  constructor(props) {
    super(props)
    this.handleFaveClick = this.handleFaveClick.bind(this);
    this.handleRemoveFaveClick = this.handleRemoveFaveClick.bind(this);
    this.toggleUpdateForm = this.toggleUpdateForm.bind(this);
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
    this.setState({isFave: 'false'})
    axios.post('/playlist', this.state).then(result => {
      console.log('AND WE BACK', result);
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
          {/* <Paper className="paper"> */}
            <h1 className="h1-test" >Your Spotify-Generated Playlist:</h1>
            <h3 className="h3-test" >{name}</h3>
            <p>Genres: {genres}</p>
            <p>Description: {description}</p>
            <img src={imgUrl} width="300px" alt="playlist-image" />
            {tracks}
            <ColorChart colors={colors} />
            <AttsChart spfyAtts={spfyAtts} />
            {addOrRemoveBtn}
            {/* make sure buttons stick to the color theme */}
            <Button className="edit-button" variant="text" onClick={this.toggleUpdateForm}>Edit Playlist</Button>
            <Link className="profile-button" to="/profile"><Button variant="contained" color="primary">Back to Profile</Button></Link>
          {/* </Paper> */}
        </div>
      );
    }
  }
}

export default withRouter(Playlist);
