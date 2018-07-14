import React, { Component } from 'react';
import axios from 'axios';

class GetCloudinary extends Component {
  constructor(props) {
    super(props)
  }

//get cloud result
  getCloudinaryResult() {
    axios.get('/cloudinary-test').then((result) => {
      console.log(result.data);
      console.log('here are colors: ', result.data.colors);
    });
  }

  render () {
    return (
      <button onClick={this.getCloudinaryResult}>Click me to get sample Cloudinary result</button>
    );
  }
}

export default GetCloudinary;
