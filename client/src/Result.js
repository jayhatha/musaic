import React from 'react';
import Grid from '@material-ui/core/Grid';
import Playlist from './Playlist';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

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

const Result = props => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Grid container spacing={12}>
        <Grid item xs={12}>
          <h1>Results:</h1>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>
            <h2>Your uploaded photo:</h2>
            <img src={props.imgURL} width="100%" ></img>
          </Paper>
          <Paper className={classes.paper}>
            <Button className={classes.button} variant="raised" color="default">Upload Another Photo</Button>
            <Button className={classes.button} variant="raised" color="default">Get a New Playlist</Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>
            <Playlist playlist={this.props.playlist} 
                      genres={this.props.genres}
                      imgURL={this.props.imgURL}
                      colors={this.props.colors}
                      user={this.props.user} />
          </Paper>
        </Grid>
       
      </Grid>
    </div>
  )
}

export default withStyles(styles)(Result)
