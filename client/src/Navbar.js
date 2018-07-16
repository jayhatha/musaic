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
            {/* Option 2 menu bar - hamburger */}
            {/* <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuButton />
            </IconButton> */}
            <Typography id='page-title' variant="title" color="inherit" className={classes.flex}>
              Moodsic
            </Typography>

            <Link to='/'>
              <Button id='nav-title' color="inherit">Home</Button>
            </Link>

            <Link to='/profile'>
              <Button id='nav-title' color="inherit">Profile</Button>
            </Link>

            <Link to='/'>
              <Button onClick={props.logout} id='nav-title' color="inherit">Logout</Button>
            </Link>

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
            {/* Option 2 menu bar - hamburger */}
            {/* <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuButton />
            </IconButton> */}
            <Typography id='page-title' variant="title" color="inherit" className={classes.flex}>
              Moodsic
            </Typography>

            <Link to='/about'>
              <Button id='nav-title' color="inherit">About</Button>
            </Link>

            <Link to='/'>
              <Button id='nav-title' color="inherit">Home</Button>
            </Link>

            <Link to='/signup'>
              <Button id='nav-title' color="inherit">Signup</Button>
            </Link>

            <Link to='/login'>
              <Button id='nav-title' color="inherit">Login</Button>
            </Link>

            <Link to='/upload'>
              <Button id='nav-title' color="inherit">Upload Your Photo</Button>
            </Link>

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
