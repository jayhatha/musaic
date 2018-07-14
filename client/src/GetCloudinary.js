import React, { Component } from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone'
import axios from 'axios'

class GetCloudinary extends Component {
  constructor(props) {
    super(props)
  }

//get cloud result
  getCloudinaryResult() {
    axios.get('/cloudinary-test').then((err, result) => {
      console.log(result);
    });
  }

  render () {
    return (
      <button onClick={this.getCloudinaryResult}>Click me to get sample Cloudinary result</button>
    );
  }
}

export default GetCloudinary;
