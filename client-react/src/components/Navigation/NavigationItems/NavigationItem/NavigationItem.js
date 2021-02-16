import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavigationItem.css';

const navigationItem = ({ link, children }) => {
  return (
    <li className="NavigationItem">
      <NavLink to={link} activeClassName="active" exact>
        {children}
      </NavLink>
    </li>
  );
};

export default navigationItem;
