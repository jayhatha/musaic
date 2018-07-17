import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuButton from './MenuButton';
import { Link } from 'react-router-dom';
import './App.css';

// Navbar holding heading, title...need to refactor

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

function Navbar(props) {
  const { classes } = props;
  if (props.user) {
    console.log('In if props . user', props.user)
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography id='page-title' variant="title" color="inherit" className={classes.flex}>
              Moodsic
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  } else {
    console.log('In else ', props.user)

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography id='page-title' variant="title" color="inherit" className={classes.flex}>
              Moodsic
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }

}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navbar);
