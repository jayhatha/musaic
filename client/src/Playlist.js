import React from 'react';
import Button from '@material-ui/core/Button';

const Playlist = (props) => {
      if (props.playlist) {
      let playlistMap = props.playlist.map((track) =>
      <p>{track.name} - {track.artists[0].name}</p>)
      return (
        <div>
          <h1>Your Spotify-Generated Playlist:</h1>
          {playlistMap}
          <Button variant="contained" color="primary">Save this Playlist</Button>
        </div>
      );
      }
}



export default Playlist;
