import React from 'react';
import {Redirect} from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

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

const LogininSignup = (props) => {
  const { classes } = props;
  if (props.user) {
    return <Redirect to='profile' />
  } else {
    return (
      <div id="auth-wrapper" className={classes.root}>
        <Grid container spacing={12}>

          <Grid item xs={12} md={6}>
            <Signup user={props.user} liftToken={props.liftToken} />
          </Grid>

          <Grid item xs={12} md={6}>
            <Login user={props.user} liftToken={props.liftToken} />
          </Grid>
          
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(LogininSignup);
