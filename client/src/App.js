import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Playlist from './Playlist'
import Login from './Login';
import Signup from './Signup';
import { UserProfile } from './UserProfile';
import PhotoForm from './forms/PhotoForm';
// import Button from './@material-ui/core/button';



class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      token: '',
      user: null,
      lockedResult: '',
      playlist: [],
      spotifyToken: ''
    }
    this.checkForLocalToken = this.checkForLocalToken.bind(this);
    this.logout = this.logout.bind(this);
    this.liftTokenToState = this.liftTokenToState.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  liftTokenToState(data) {
    this.setState({
      token: data.token,
      user: data.user
    })
  }

  handleClick(e) {
    e.preventDefault();
    axios.defaults.headers.common['Authorization'] = `Bearer ${this.state.token}`;
    axios.get('/locked/test').then( results => {
      this.setState({
        lockedResult: results.data
      })
    })
  }


  handleDrop = files => {
  // Push all the axios request promise into a single array
  const uploaders = files.map(file => {
    // Initial FormData
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESET);
    formData.append("api_key", process.env.REACT_APP_CLOUDINARY_API);
    formData.append("timestamp", (Date.now() / 1000) | 0);

    // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
    return axios.post("https://api.cloudinary.com/v1_1/dieaqkurh/image/upload", formData, {
      headers: { "X-Requested-With": "XMLHttpRequest" },
    }).then(response => {
      const data = response.data;
      const fileURL = data.secure_url
      console.log(data);
    })
  });

  // Once all the files are uploaded
  axios.all(uploaders).then(() => {
    // ... perform after upload is successful operation
    console.log('############HEEEEEEYYYYYY!!!###########')
  });
}

  componentDidMount() {
    this.checkForLocalToken();
    this.checkForSpotifyToken()
    }

  logout() {
    // remove token from local storage
    localStorage.removeItem('mernToken');
    // remove info from state
    this.setState({
      token: '',
      user: null
    })
  }

  checkForSpotifyToken() {
    //Look for Spotify token in local storage
    let spotifyToken = localStorage.getItem('spotifyToken');
    console.log('checking for sfy token')
    if (!spotifyToken || spotifyToken === 'undefined') {
      // There was no token
      // clear out anything weird that might be there
      console.log('no sfy token found')
      localStorage.removeItem('spotifyToken')
      this.setState({
        spotifyToken: '',
      })

      // we need to call the Spotify API on the back end and get a token
      // let's hit that route
      console.log('trying to hit route on back end')
      axios.post('/auth/get/spotify/token').then( results => {
        // put the token in local storage
        console.log(results.data)
        localStorage.setItem('spotifyToken', results.data.access_token);
        this.setState({
          spotifyToken: results.data.access_token,
        })
      }).catch( err => console.log(err))
    }
  }

  checkForLocalToken() {
    //Look for token in local storage
    let token = localStorage.getItem('mernToken');
    if (!token) {
      // There was no token
      // remove mernToken from local storage just in case corrupted, replaced etc
      localStorage.removeItem('mernToken')
      this.setState({
        token: '',
        user: null
      })
    } else {
      // token found in local storage
      // send it to the back to be verified
      axios.post('/auth/me/from/token', {
        token
      }).then( results => {
        // put the token in local storage
        localStorage.setItem('mernToken', results.data.token);
        this.setState({
          token: results.data.token,
          user: results.data.user
        })
      }).catch( err => console.log(err))
    }
  }


  render() {
    let user = this.state.user;
    if (user) {
      return (
        <div className="App">
          <UserProfile user={user} logout={this.logout}/>
          <a onClick={this.handleClick}> Test the protected route</a>
          <p>{this.state.lockedResult}</p>
        </div>
      );
    } else {
      return (
        <div className="App">
          <Signup liftToken={this.liftTokenToState} />
          <Login liftToken={this.liftTokenToState} />

          <PhotoForm />

          <p><Playlist playlist={this.state.playlist}/></p>

        </div>
          )
        }
        if (this.state.playlist) {
          return (
            <p><Playlist playlist={this.state.playlist}/></p>
          )
        }
      }
    }

export default App;
