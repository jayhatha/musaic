import React, {Component} from 'react';

class Spotify extends Component {
  constructor(){
  super();
  const params = this.getHashParams();
  console.log(params);
}
getHashParams() {
  var hashParams = {};
  var e, r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
  e = r.exec(q)
  while (e) {
     hashParams[e[1]] = decodeURIComponent(e[2]);
     e = r.exec(q);
  }
  return hashParams;
}
render() {
  return (
    <div className="App">
      <a href='http://localhost:3000'> Login to Spotify </a>
    </div>
  );
}
}

export default Spotify;
