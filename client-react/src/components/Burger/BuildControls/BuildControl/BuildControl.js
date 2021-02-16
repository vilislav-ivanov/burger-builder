import React from 'react';

import './BuildControl.css';

const buildControl = ({ label, onMoreClick, onLessClick, disabled }) => {
  return (
    <div className="BuildControl">
      <div className="Label">{label}</div>
      <button className="More" onClick={onMoreClick}>
        More
      </button>
      <button className="Less" onClick={onLessClick} disabled={disabled}>
        Less
      </button>
    </div>
  );
};

export default buildControl;
