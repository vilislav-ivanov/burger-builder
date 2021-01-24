const isEmpty = require('./isEmpty');

module.exports = (data) => {
  const errors = {};
  if (isEmpty(data.stage)) {
    errors.stage = 'Stage field is required';
  }

  if (!['ordered', 'accepted', 'sent', 'delivered'].includes(data.stage)) {
    errors.stage = 'Stage type could only be ordered/accepted/sent/delivered';
  }

  const isValid = Object.keys(errors).length === 0;
  return {
    errors,
    isValid,
  };
};
