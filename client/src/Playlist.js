import React, {Component} from 'react';
import axios from 'axios';

class Playlist extends Component {

  constructor(props) {
    super(props)
    this.handleFaveClick = this.handleFaveClick.bind(this);
  }

  handleFaveClick(e) {
    e.preventDefault();
    console.log("FAVE CLICK");
    axios.post('/playlist', {
      user: this.props.user._id,
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
          <h1>THESE ARE SOME SONGS</h1>
          {playlistMap}
          
          <button onClick={this.handleFaveClick}>Add Playlist to Favorites</button>

        </div>
      );
    }
  }
}



export default Playlist;
