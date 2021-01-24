const isEmpty = require('./isEmpty');

module.exports = (data) => {
  const errors = {};
  if (isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }
  if (isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  const isValid = Object.keys(errors).length === 0;
  return {
    errors,
    isValid,
  };
};
