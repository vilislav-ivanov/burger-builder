const { InvalidPropertyError } = require('../helpers/errors');
const requiredParams = require('../helpers/required-params');
const isNumeric = require('../helpers/is-numeric');
const isValidEmail = require('../helpers/is-valid-email');
const upperFirst = require('../helpers/upper-first');

module.exports = function makeOrder(orderInfo = requiredParams('orderInfo')) {
  const validOrder = validate(orderInfo);
  const normalOrder = normalize(validOrder);
  return Object.freeze(normalOrder);

  function validate({
    price = requiredParams('price'),
    firstName = requiredParams('firstName'),
    lastName = requiredParams('lastName'),
    emailAddress = requiredParams('emailAddress'),
    address = requiredParams('address'),
    postalCode = requiredParams('postalCode'),
    ingredients = requiredParams('ingredients'),
    ...other
  }) {
    validateName('firstNmae', firstName);
    validateName('lastName', lastName);
    validateEmail(emailAddress);
    validateNumeric('postalCode', postalCode);
    validateNumeric('price', price);
    const { meat = 0, bacon = 0, salad = 0, cheese = 0 } = ingredients;
    validateNumeric('meat', meat);
    validateNumeric('bacon', bacon);
    validateNumeric('salad', salad);
    validateNumeric('cheese', cheese);
    validateAddress(address);
    return {
      ...other,
      price,
      firstName,
      lastName,
      emailAddress,
      address,
      postalCode,
      ingredients: {
        meat,
        bacon,
        salad,
        cheese,
      },
    };
  }
  function normalize({
    price,
    firstName,
    lastName,
    emailAddress,
    ingredients,
    ...other
  }) {
    const { meat, bacon, salad, cheese } = ingredients;
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
      emailAddress: emailAddress.toLowerCase(),
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
  function validateEmail(emailAddress) {
    if (!isValidEmail(emailAddress)) {
      throw new InvalidPropertyError(
        `${emailAddress} is not valid email address.`
      );
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
