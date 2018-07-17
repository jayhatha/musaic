import React from 'react';
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

handleChange = (e) => {
  console.log('change');
  this.setState({ 
    genres: e.target.value,
    name: e.target.value,
    description: e.target.value,
    tags: e.target.value,
    songs: e.target.value 
  })
}

handleSubmit = (e) => {
  e.preventDefault();
  var newData = document.this.serialize();
  var url = document.this.getAttribute('action');
  axios.put({method: 'PUT', data: newData, url: url}).then((data) => {
    res.json(data);
  })
}

const UpdatePlaylist = props => {
  const { classes } = props;
  return (
    <div className={classes.root} >
      <Grid container spacing={12}>
        <Grid item >
          <Paper className={classes.paper} >
            <form onSubmit={this.handleSubmit} method="POST" action={"/playlist/user/" + userID}>
              <TextField 
                id="name"
                label="Name"
                className={classes.TextField}
                value={this.state.name}
                onChange={this.handleChange('name')}
                margin="normal"
              />
              <TextField
                id="description"
                label="Description"
                className={classes.TextField}
                value={this.state.description}
                onChange={this.handleChange('description')}
                margin="normal"
              />
              <TextField
                id="tag"
                label="Tag"
                className={classes.TextField}
                value={this.state.tags}
                onChange={this.handleChange('tag')}
                margin="normal"
              />
              <TextField
                id="genre"
                label="Genre(s)"
                className={classes.TextField}
                value={this.state.genres}
                onChange={this.handleChange('genre')}
                margin="normal"
                disabled
              />
              <TextField
                id="songs"
                label="Songs"
                className={classes.TextField}
                value={this.state.songs}
                onChange={this.handleChange('songs')}
                margin="normal"
              />
            </form>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export default withStyles(styles)(UpdatePlaylist);