import React, {Component} from 'react';

const Playlist = (props) => {
      if (props.playlist) {
      let playlistMap = props.playlist.map((track) =>
      <p>{track.name} - {track.artists[0].name}</p>)
      return (
        <div>
          <h1>THESE ARE SOME SONGS</h1>
          {playlistMap}
        </div>
      );
      }
}



export default Playlist;
