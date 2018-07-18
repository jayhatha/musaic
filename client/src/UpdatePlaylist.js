import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { TextField } from '../node_modules/@material-ui/core';
import axios from 'axios';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
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
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  }
})

class UpdatePlaylist extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: this.props.name,
      description: this.props.description,
      tags: this.props.tags,
      genres: this.props.genres
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this)
    this.handleTagChange = this.handleTagChange.bind(this)
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const url = '/playlist/' + //playlist id
    console.log("Updating Playlist!");
    axios.put('/playlist', {
      name: this.state.name,
      description: this.state.description,
      tags: this.state.tags,
      genres: this.state.genres
    }).then(result => {
      console.log(result + " of updating playlist");
    }).catch(err => {
      console.log('We caught an error: ' + err);
    })
  }

  handleNameChange = (e) => {
    console.log("the name is a-changing");
    this.setState({ name: e.target.value }), () => {
      console.log("changes lifted to state");
    }
  }

  handleDescriptionChange = (e) => {
    console.log("the description is a-changing");
    this.setState({ description: e.target.value }), () => {
      console.log("changes lifted to state");
    }
  }

  handleTagChange = (e) => {
    console.log("the tag is a-changing");
    this.setState({ tags: e.target.value }), () => {
      console.log("changes lifted to state");
    }
  }

  render() {
    const { classes } = this.props;
    
    return (
      <div className={classes.root} >
        <Grid container spacing={12}>
          <Grid item xs={12}>
            <Paper className={classes.paper} >
              <form onSubmit={this.handleSubmit}>
                <TextField
                  id="name"
                  label="Name"
                  className={classes.textField}
                  value={this.state.name}
                  onChange={this.handleNameChange}
                  margin="normal"
                />
                <TextField
                  id="description"
                  label="Description"
                  className={classes.textField}
                  value={this.state.description}
                  onChange={this.handleDescriptionChange}
                  margin="normal"
                />
                <TextField
                  id="tag"
                  label="Tag"
                  className={classes.textField}
                  value={this.state.tags}
                  onChange={this.handleTagChange}
                  margin="normal"
                />
                <TextField
                  id="genre"
                  label="Genre(s)" 
                  className={classes.textField}
                  value={this.state.genres}
                  margin="normal"
                  disabled
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