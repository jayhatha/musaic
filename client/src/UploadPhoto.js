import React, { Component } from 'react';
import PhotoForm from './forms/PhotoForm';


class UploadPhoto extends Component {
  constructor(props) {
    super(props)

    }

    render() {
      return (
        <div>
          <h1>THIS IS THE UPLOAD PHOTO PAGE</h1>
          <p>This is where you uplaod your photos </p>
          <PhotoForm liftPlaylist={this.handlePlaylist} liftPhoto={this.handlePhoto} />

        </div>
      )
    }
  }

export default UploadPhoto;
