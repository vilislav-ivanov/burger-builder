import React from 'react';

import './DrawerToggle.css';

const drawerToggle = ({ onClick }) => (
  <div className="DrawerToggle" onClick={onClick}>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export default drawerToggle;
