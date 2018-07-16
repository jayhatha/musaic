import React from 'react';

export const UserProfile = props => {
  return (
    <div>
      <p>Hello, {props.user.name}!</p>
    </div>
  )
};
