import React from 'react';
import Grid from '@material-ui/core/Grid';
import Playlist from './Playlist';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import './App.css';
import {Link} from 'react-router-dom';
import homescreenshot from './homescreenshot.png';
import './App.css';

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
      <button className='home-button try-button' >Get started or login</button>
    </Link>
  );
  if (props.user) {
    tryButton = '';
  }

  return (
    <div id="home-page" className={classes.root}>
      <Grid container spacing={12}>
        <Grid item xs={12}>
        </Grid>
        <Grid item xs={12} md={12}>
          <Paper id="description" className={classes.paper}>

            <p>Moodsic is a color analysis appication that generates a personalized
              playlist. Simply upload a photo, select a genre and create your playlist!</p>

          </Paper>
          {tryButton}
        </Grid>
      </Grid>
      <div>
        <img id='sample-photo' src={homescreenshot}></img>
      </div>
    </div>
  )
}

export default withStyles(styles)(Home);
