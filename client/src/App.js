import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Playlist from './Playlist'
import Login from './Login';
import Signup from './Signup';
import { UserProfile } from './UserProfile';
import PhotoForm from './forms/PhotoForm';
import Result from './Result';
import Input from '@material-ui/core/Input'



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
    // this.handleSubmit = this.handleSubmit.bind(this);
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
    axios.get('/locked/test').then(results => {
      this.setState({
        lockedResult: results.data
      })
    })
  }

  // Submit Call to Spotify for the playlist
  // handleSubmit(e) {
  //   e.preventDefault();
  //   console.log("SUBMIT");
  //   var spotifyToken = localStorage.getItem('spotifyToken');
  //   console.log('###TOKEN', spotifyToken)
  //   axios.defaults.headers.common['Authorization'] = "Bearer " + spotifyToken;
  //   axios.get(`https://api.spotify.com/v1/recommendations?limit=50&seed_genres=indie&max_danceability=0.5&max_valence=0.5&max_energy=0.5`)
  //     .then(response => {
  //       console.log(response.data.tracks);
  //       var spotifyTracks = response.data.tracks;
  //       this.setState({
  //         spotifyToken,
  //         // we have a playlist in state!
  //         playlist: spotifyTracks
  //       })
  //     })
  // }

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
      }).then(results => {
        // put the token in local storage
        localStorage.setItem('mernToken', results.data.token);
        this.setState({
          token: results.data.token,
          user: results.data.user
        })
      }).catch(err => console.log(err))
    }
  }


  render() {
    let user = this.state.user;
    if (user) {
      return (
        <div className="App">
          <UserProfile user={user} logout={this.logout} />
          <a onClick={this.handleClick}> Test the protected route</a>
          <p>{this.state.lockedResult}</p>
          <Result />
        </div>
      );
    } else {
      return (
        <div className="App">
          <Signup liftToken={this.liftTokenToState} />
          <Login liftToken={this.liftTokenToState} />
          
          <PhotoForm/>
          <p><Playlist playlist={this.state.playlist} /></p>
        </div>
      )
    }
    if (this.state.playlist) {
      return (
        <p><Playlist playlist={this.state.playlist} /></p>
      )
    }
  }
}

export default App;
