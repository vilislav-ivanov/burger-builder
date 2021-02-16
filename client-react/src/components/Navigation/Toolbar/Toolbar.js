import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../../Navigation/NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

import './Toolbar.css';

const toolbar = ({ showSideDrawer }) => {
  return (
    <div className="Toolbar">
      <DrawerToggle onClick={showSideDrawer} />
      <Logo />
      <div className="DesktopOnly">
        <NavigationItems />
      </div>
    </div>
  );
};

export default toolbar;
