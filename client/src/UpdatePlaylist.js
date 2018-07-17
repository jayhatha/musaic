import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { TextField } from '../node_modules/@material-ui/core';
import axios from 'axios';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    textAlign: 'center',
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
      margin: theme.spacing.unit * 2,
        height: '100%',
          color: theme.palette.text.secondary,
            textAlign: 'center'
  },
  button: {
    margin: theme.spacing.unit * 1
  },
  input: {
    margin: theme.spacing.unit * 1,
  }
})

class UpdatePlaylist extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: this.props.user,
      playlist: this.props.playlist,
      name: this.props.name,
      description: this.props.description,
      tags: this.props.tags,
      genres: this.props.genres,
      imageURL: this.props.imgURL,
      songs: this.props.playlist,
      colorData: this.props.colors
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updating Playlist!");
    axios.put('/playlist', {
      user: this.props.user,
      playlist: this.props.playlist,
      name: this.props.name,
      description: this.props.description,
      tags: this.props.tags,
      genres: this.props.genres,
      imageURL: this.props.imgURL,
      songs: this.props.playlist,
      colorData: this.props.colors
    }).then(result => {
      console.log(result);
    }).catch( err => {
      console.log('We caught an error: ' + err);
    })
  }
  render(){
    return (
      <div className="root" >
        <Grid container spacing={12}>
          <Grid item xs={12}>
            <Paper className="paper" >
              <form onSubmit={this.handleSubmit} method="POST">
                <TextField
                  id="name"
                  label="Name"
                  className="TextField, input"
                  value={this.state.name}
                  // onChange={this.handleChange('name')}
                  margin="normal"
                />
                <TextField
                  id="description"
                  label="Description"
                  className="TextField, input"
                  value={this.state.description}
                  // onChange={this.handleChange('description')}
                  margin="normal"
                />
                <TextField
                  id="tag"
                  label="Tag"
                  className="TextField, input"
                  value={this.state.tags}
                  // onChange={this.handleChange('tag')}
                  margin="normal"
                />
                <TextField
                  id="genre"
                  label="Genre(s)"
                  className="TextField, input"
                  value={this.state.genres}
                  // onChange={this.handleChange('genre')}
                  margin="normal"
                  // disabled
                />
                <TextField
                  id="playlist"
                  label="Playlist"
                  className="TextField, input"
                  value={this.state.playlist}
                  // onChange={this.handleChange('playlist')}
                  margin="normal"
                />
                <Button variant="outlined" type="submit">Update</Button>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
  }
  
}

export default withStyles(styles)(UpdatePlaylist);