import React from 'react';
import Grid from '@material-ui/core/Grid';
import Playlist from './Playlist';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

const Result = props => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <h1>Results:</h1>
        </Grid>
        <Grid item xs={12} md={6}>
          <img src={props.imgURL} width="100%" ></img>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper className="paper">
            <Playlist playlist={props.playlist} />
            {console.log('PLAYLIST', props.playlist)}          
            <p>Here's a song</p>
            <p>Here's another song</p>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export default withStyles(styles)(Result)