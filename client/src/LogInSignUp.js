import React from 'react';
import {Redirect} from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';

const LogininSignup = (props) => {
  if (props.user) {
    return <Redirect to='profile' />
  } else {
    return (
      <div>
        <Signup user={props.user} liftToken={props.liftTokenToState} />
        <Login user={props.user} liftToken={props.liftTokenToState} />
      </div>
    )
  }
}

export default LogininSignup;
