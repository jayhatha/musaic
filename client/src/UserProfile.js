import React from 'react';

export const UserProfile = props => {
  return (
    <div>
      <p>Hello, {props.user.name}!</p>
      <a onClick={props.logout}>LOG OUT</a>
    </div>
  )
};
