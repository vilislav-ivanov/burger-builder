const { InvalidPropertyError } = require('../helpers/errors');
const requiredParams = require('../helpers/required-params');
const isNumeric = require('../helpers/is-numeric');
const isValidEmail = require('../helpers/is-valid-email');
const upperFirst = require('../helpers/upper-first');

module.exports = function makeOrder(orderInfo = requiredParams('orderInfo')) {
  console.log(orderInfo);
  const validOrder = validate(orderInfo);
  const normalOrder = normalize(validOrder);
  return Object.freeze(normalOrder);

  function validate({
    price = requiredParams('price'),
    firstName = requiredParams('firstName'),
    lastName = requiredParams('lastName'),
    email = requiredParams('email'),
    address = requiredParams('address'),
    postalCode = requiredParams('postalCode'),
    ingredients = requiredParams('ingredients'),
    ...otherInfo
  }) {
    validateName('firstNmae', firstName);
    validateName('lastName', lastName);
    validateEmail(email);
    validateNumeric('postalCode', postalCode);
    validateNumeric('price', price);
    const {
      meat = requiredParams('meat'),
      bacon = requiredParams('bacon'),
      salad = requiredParams('salad'),
      cheese = requiredParams('cheese'),
    } = ingredients;
    validateNumeric('meat', meat);
    validateNumeric('bacon', bacon);
    validateNumeric('salad', salad);
    validateNumeric('cheese', cheese);
    validateAddress(address);
    return {
      price,
      firstName,
      lastName,
      email,
      address,
      postalCode,
      meat,
      bacon,
      salad,
      cheese,
      ...otherInfo,
    };
  }
  function normalize({
    price,
    firstName,
    lastName,
    meat,
    bacon,
    salad,
    cheese,
    email,
    ...other
  }) {
    return {
      ...other,
      price: Number(price),
      ingredients: {
        meat: Number(meat),
        bacon: Number(bacon),
        salad: Number(salad),
        cheese: Number(cheese),
      },
      firstName: upperFirst(firstName),
      lastName: upperFirst(lastName),
      email: email.toLowerCase(),
    };
  }

  function validateName(label, name) {
    if (name.length < 2) {
      throw new InvalidPropertyError(
        `${label} name must be at least 2 symbols long.`
      );
    }
  }
  function validateNumeric(label, num) {
    if (!isNumeric(num)) {
      throw new InvalidPropertyError(`${label} must be a number value.`);
    }
  }
  function validateEmail(email) {
    if (!isValidEmail(email)) {
      throw new InvalidPropertyError(`${email} is not valid email address.`);
    }
  }
  function validateAddress(address) {
    if (address.length < 3) {
      throw new InvalidPropertyError(
        'Address must be at least 3 symbols long.'
      );
    }
  }
};
