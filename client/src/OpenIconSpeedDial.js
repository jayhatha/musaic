import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles, Button} from '@material-ui/core';
import {SpeedDial, SpeedDialAction, SpeedDialIcon} from '@material-ui/lab/';
import SaveIcon from '@material-ui/icons/Save';
import PrintIcon from '@material-ui/icons/Print';
import ShareIcon from '@material-ui/icons/Share';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Android from '@material-ui/icons/Android';
import VpnKey from '@material-ui/icons/VpnKey';
import Home from '@material-ui/icons/Home';
import Create from '@material-ui/icons/Create';
import ArrowForward from '@material-ui/icons/ArrowForward';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AddAPhoto from '@material-ui/icons/AddAPhoto';
import './App.css';

const styles = theme => ({
  root: {
    height: 380,
  },
  speedDial: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 3,
  },
});

// can use font size to make icons bigger <PhotoCamera style={{fonSize: 100}} />
const actionsLoggedOut = [
  { icon: <Link to='/'><Home /></Link>, name: 'Home' },
  { icon: <Link to='/loginsignup'><Create /></Link>, name: 'Signup' },
  { icon: <Link to='/loginsignup'><VpnKey /></Link>, name: 'Login' }
];

const actionsLoggedIn = [
  { icon: <Link to='/'><Home /></Link>, name: 'Home' },
  { icon: <Link to='/profile'><AccountCircle /></Link>, name: 'Profile' },
  { icon: <Link to='/'><ArrowForward /></Link>, name: 'LogOut' },
  { icon: <Link to='/upload'><AddAPhoto /></Link>, name: 'Upload Photo' }
];

class OpenIconSpeedDial extends React.Component {
  state = {
    open: false,
    hidden: false,
  };

  handleVisibility = () => {
    this.setState(state => ({
      open: false,
      hidden: !state.hidden,
    }));
  };

  handleClick = () => {
    this.setState(state => ({
      open: !state.open,
    }));
  };

  handleLogout = () => {
    this.setState(state => ({
      open: !state.open,
    }));
    this.props.logout();
  };

  handleOpen = () => {
    if (!this.state.hidden) {
      this.setState({
        open: true,
      });
    }
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    const { classes } = this.props;
    const { hidden, open } = this.state;

    let buttons = this.props.user ? actionsLoggedIn : actionsLoggedOut;

    return (
      <div className={classes.root}>
        <SpeedDial
          ariaLabel="SpeedDial openIcon example"
          className={classes.speedDial}
          hidden={hidden}
          onBlur={this.handleClose}
          onClick={this.handleClick}
          onClose={this.handleClose}
          onFocus={this.handleOpen}
          onMouseEnter={this.handleOpen}
          onMouseLeave={this.handleClose}
          open={open}
        >
          {buttons.map((action) => {
            if (action.name !== 'LogOut') {
                return (
                  <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                    onClick={this.handleClick}
                  />
                )
            } else {
              return (
                <SpeedDialAction
                  key={action.name}
                  icon={action.icon}
                  tooltipTitle={action.name}
                  onClick={this.handleLogout}
                />
              )
            }
          })}
        </SpeedDial>
      </div>
    );
  }
}

OpenIconSpeedDial.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OpenIconSpeedDial);
