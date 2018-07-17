import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { TextField } from '../node_modules/@material-ui/core';

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
  }
})

class UpdatePlaylist extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  // handleChange = (e) => {
  //   console.log('change');
  //   this.setState({
  //     genres: e.target.value,
  //     name: e.target.value,
  //     description: e.target.value,
  //     tags: e.target.value,
  //     songs: e.target.value
  //   })
  // }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updating Playlist!");
    axios.put('/playlist/user/userID', {
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
          <Grid item >
            <Paper className="paper" >
              <form onSubmit={this.handleSubmit} method="POST" action={"/playlist/" + userID}>
                <TextField
                  id="name"
                  label="Name"
                  className={classes.TextField}
                  value={this.props.name}
                  // onChange={this.handleChange('name')}
                  margin="normal"
                />
                <TextField
                  id="description"
                  label="Description"
                  className={classes.TextField}
                  value={this.props.description}
                  // onChange={this.handleChange('description')}
                  margin="normal"
                />
                <TextField
                  id="tag"
                  label="Tag"
                  className={classes.TextField}
                  value={this.props.tags}
                  // onChange={this.handleChange('tag')}
                  margin="normal"
                />
                <TextField
                  id="genre"
                  label="Genre(s)"
                  className={classes.TextField}
                  value={this.props.genres}
                  // onChange={this.handleChange('genre')}
                  margin="normal"
                  disabled
                />
                <TextField
                  id="playlist"
                  label="Playlist"
                  className={classes.TextField}
                  value={this.props.playlist}
                  // onChange={this.handleChange('playlist')}
                  margin="normal"
                />
              </form>
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
  }
  
}

export default withStyles(styles)(UpdatePlaylist);