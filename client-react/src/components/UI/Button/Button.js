import React from 'react';

import './Button.css';

const button = ({ type, onClick, disabled, children }) => {
  const classes = ['Button'];
  classes.push(type);
  return (
    <button onClick={onClick} className={classes.join(' ')} disabled={disabled}>
      {children}
    </button>
  );
};

export default button;
