import React, { Component } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import './App.css';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
  text: {
    color: '#F44336'
  }
});


class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      response: null,
      open: false
    }
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleEmailChange(e) {
    this.setState({
      email: e.target.value
    })
  }

  handlePasswordChange(e) {
    this.setState({
      password: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    axios.post('/auth/login', {
      email: this.state.email,
      password: this.state.password
    }).then(result => {
      if (result.data.hasOwnProperty('error')) {
        this.setState({
          response: result.data,
          open: true
        })
      } else {
        localStorage.setItem('mernToken', result.data.token)
        this.props.liftToken(result.data);
        this.setState({
          response: null
        })
      }
    })
  }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id" className={classes.text}>{this.state.response ? this.state.response.message : ''}</span>}
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
        <form className="auth" onSubmit={this.handleSubmit}>
          Email: <input type="email"
            value={this.state.email}
            onChange={this.handleEmailChange}
          /> <br />
          Password: <input type="password"
            value={this.state.password}
            onChange={this.handlePasswordChange}
          /><br />
          <Button variant="contained" type="submit">Log In</Button>
        </form>
      </div>
    )
  }
}

export default withStyles(styles)(Login);
