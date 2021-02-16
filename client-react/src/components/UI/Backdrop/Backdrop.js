import React from 'react';

import './Backdrop.css';

const backdrop = ({ show, onBackdropClicked }) =>
  show ? <div className="Backdrop" onClick={onBackdropClicked}></div> : null;

export default backdrop;
