import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';

class MenuButton extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;

    return (
      <div>
        <MenuIcon
          aria-owns={anchorEl ? 'simple-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          Open Menu
        </MenuIcon>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <Link to='/'>
            <MenuItem onClick={this.handleClose}>Home</MenuItem>
          </Link>

          <Link to='/signup'>
            <MenuItem onClick={this.handleClose}>Signup</MenuItem>
          </Link>

          <Link to='/login'>
            <MenuItem onClick={this.handleClose}>Login</MenuItem>
          </Link>
        </Menu>
      </div>
    );
  }
}

export default MenuButton;
