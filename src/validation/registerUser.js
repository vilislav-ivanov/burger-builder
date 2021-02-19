const isEmpty = require('./isEmpty');

module.exports = (data) => {
  const errors = {};
  if (isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }
  if (isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }
  if (isEmpty(data.confirmPassword)) {
    errors.confirmPassword = 'Confirm Passport field is required';
  }
  if (data.confirmPassword && data.confirmPassword !== data.password) {
    errors.passwords = 'Passwords do not match';
  }

  const isValid = Object.keys(errors).length === 0;
  return {
    errors,
    isValid,
  };
};
