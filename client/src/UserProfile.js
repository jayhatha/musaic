import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';

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

const handleBtnClick = (userID) => {
	console.log('CLIKC');
	const url = '/playlist/user/' + userID;
	console.log(url)
	axios.get(url).then((result) => {
		console.log('AND WE BACK', result);
	});
}

export const UserProfile = (props) => {
	const classes = props;
	return (
		<div className={classes.root} >
		  <p>Hello, {props.user.name}!</p>
		  <a onClick={props.logout}>LOG OUT</a>

		  <Button onClick={() => {handleBtnClick(props.user._id)}} 
		  		  className={classes.button} 
		  		  variant="raised" 
		  		  color="default">Your Playlists</Button>
		</div>
	)
};
