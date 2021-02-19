const isEmpty = require('./isEmpty');

module.exports = (data) => {
  const errors = {};
  if (isEmpty(data.ingredients.meat)) {
    errors.meat = 'Meat ingredient is required';
  }
  if (isEmpty(data.ingredients.bacon)) {
    errors.bacon = 'Bacon ingredient is required';
  }
  if (isEmpty(data.ingredients.salad)) {
    errors.salad = 'Salad ingredient is required';
  }
  if (isEmpty(data.ingredients.cheese)) {
    errors.cheese = 'Cheese ingredient is required';
  }
  if (isEmpty(data.price)) {
    errors.price = 'Price field is required';
  }
  // if (data.price && !validator.isDecimal(data.price)) {
  //   errors.price = 'Price field must be a decimal number';
  // }
  if (isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }
  if (isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }
  if (isEmpty(data.address)) {
    errors.address = 'Address field is required';
  }
  if (isEmpty(data.postalCode)) {
    errors.postalCode = 'Postal Code field is required';
  }

  const isValid = Object.keys(errors).length === 0;
  return {
    errors,
    isValid,
  };
};
