import React from 'react';
import Grid from '@material-ui/core/Grid';
import Playlist from './Playlist';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import './App.css';
import {Link} from 'react-router-dom';
import PhotoPlaylistSample from './PhotoPlaylistSample.png';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    margin: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  button: {
    margin: theme.spacing.unit * 1
  }
});

const Home = props => {
  const { classes } = props;
  let tryButton = (
    <Link to='/loginsignup'>
      <button className='home-button try-button' >Try</button>
    </Link>
  );
  if (props.user) {
    tryButton = '';
  }
  return (
    <div id="home-page" className={classes.root}>
      <Grid container spacing={12}>
        <Grid item xs={12}>
          <h1>Welcome to Moodsic!</h1>
        </Grid>
        <Grid item xs={12} md={12}>
          <Paper id="description" className={classes.paper}>
            <p>Want a playlist generated for you based on what you are doing? Yes? Then check this out!
              Moodsic is an application that will generate a playlist from a photo you upload.
              Out with friends, take a selfie and upload to see what songs will generate for you.
              Want to select the genre of music where this playlist will generate from? Go ahead!
              Click the link below to get started. Enjoy the Moodsic.</p>
          </Paper>
          {tryButton}
          <button className='home-button try-button' >Learn More</button>
        </Grid>
      </Grid>
      <div>
        <img id='sample-photo' src={PhotoPlaylistSample}></img>
      </div>
    </div>
  )
}

export default withStyles(styles)(Home);
