import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

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
  },
  text: {
    color: "#4CAF50"
  }
});

class LoginSignup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
    this.handleClose = this.handleClose.bind(this)
  }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    if (this.props.user) {
      return (
        <div>
          <Snackbar
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={this.state.open}
            autoHideDuration={6000}
            onClose={this.handleClose}
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={<span id="message-id" className={classes.text}>You have logged in!</span>}
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                className={classes.close}
                onClick={this.handleClose}
              >
                <CloseIcon />
              </IconButton>,
            ]}
          />
          <Redirect to='profile' />
        </div>
      )
    } else {
      return (
        <div id="auth-wrapper" className={classes.root}>
          <Grid container spacing={12}>
            <Grid item xs={12} md={6}>
              <Signup user={this.props.user} liftToken={this.props.liftToken} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Login user={this.props.user} liftToken={this.props.liftToken} />
            </Grid>
          </Grid>
        </div>
      )
    }
  }
}

export default withStyles(styles)(LoginSignup);
