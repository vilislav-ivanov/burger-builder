import React from 'react';

import './Input.css';

const Input = ({
  inputType,
  invalid,
  errorMessage,
  label,
  config,
  changed,
  value,
  disabled,
}) => {
  let inputElement = null;

  switch (inputType) {
    case 'input':
      const classes = invalid ? 'Input Invalid' : 'Input';

      const errorMessageDisplay = invalid ? <p>{errorMessage}</p> : null;
      inputElement = (
        <div className={classes}>
          <label className="InputLabel">{label}</label>
          <input
            className="InputElement"
            {...config}
            onChange={changed}
            value={value}
          />
          {errorMessageDisplay}
        </div>
      );
      break;
    case 'textarea':
      inputElement = <textarea />;
      break;
    case 'select':
      inputElement = (
        <div className="Input">
          <label className="InputLabel">{label}</label>
          <select className="InputElement" onChange={changed} value={value}>
            {config.options.map((option) => {
              return (
                <option key={option.value} value={option.value}>
                  {option.displayValue}
                </option>
              );
            })}
          </select>
        </div>
      );
      break;
    default:
      inputElement = <input />;
  }

  if (disabled) inputElement = null;

  return inputElement;
};

export default Input;
