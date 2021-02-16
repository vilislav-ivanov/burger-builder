import React, { Fragment } from 'react';

import Backdrop from '../Backdrop/Backdrop';

import './Modal.css';

const modal = ({ show, onClick, children }) => (
  <Fragment>
    <Backdrop show={show} onBackdropClicked={onClick} />
    <div
      className="Modal"
      style={{
        transform: show ? 'translateY(0)' : 'translateY(-100vh)',
        opacity: show ? '1' : '0',
      }}
    >
      {children}
    </div>
  </Fragment>
);

export default modal;
