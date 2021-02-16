import React, { Fragment } from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import './SideDrawer.css';

const sideDrawer = ({ displaySideDrawer, hideSideDrawer }) => {
  let classes = ['SideDrawer', 'Close'];

  if (displaySideDrawer) {
    classes = ['SideDrawer', 'Open'];
  }

  return (
    <Fragment>
      <Backdrop show={displaySideDrawer} onBackdropClicked={hideSideDrawer} />
      <div className={classes.join(' ')}>
        <div className="LogoSidedrawer">
          <Logo />
        </div>
        <NavigationItems />
      </div>
    </Fragment>
  );
};

export default sideDrawer;
