import React, {Component} from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';

class Playlist extends Component {

  constructor(props) {
    super(props)
    this.handleFaveClick = this.handleFaveClick.bind(this);
  }

  handleFaveClick(e) {
    e.preventDefault();
    console.log("FAVE CLICK");
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

  render() {
    if (this.props.playlist) {
      let playlistMap = this.props.playlist.map((track) =>
      <p>{track.name} - {track.artists[0].name}</p>)
      return (
        <div>
          <h1>Your Spotify-Generated Playlist:</h1>
          {playlistMap}
          
          <Button onClick={this.handleFaveClick} variant="contained" color="primary">Save this Playlist</Button>
        </div>
      );
    }
  }
}



export default Playlist;
