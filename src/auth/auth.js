const { InvalidPropertyError } = require('../helpers/errors');
const isValidEmail = require('../helpers/is-valid-email');
const { hashPassword } = require('../helpers/bcrypt');

const requiredParams = require('../helpers/required-params');

async function makeRegister(registerInfo = requiredParams('registerInfo')) {
  const validRegisterInfo = validate(registerInfo);
  const normalRegisterInfo = await normalize(validRegisterInfo);
  return Object.freeze(normalRegisterInfo);

  function validate({
    emailAddress = requiredParams('emailAddress'),
    password = requiredParams('password'),
    confirmPassword = requiredParams('confirmPassword'),
    ...otherInfo
  }) {
    validateEmail(emailAddress);
    validatePassword(password, 'password');
    validatePassword(confirmPassword, 'confirm password');
    validateConfirmPassword(password, confirmPassword);
    return {
      ...otherInfo,
      emailAddress,
      password,
      confirmPassword,
    };
  }

  async function normalize({ emailAddress, password }) {
    return {
      emailAddress: emailAddress.toLowerCase(),
      hashedPassword: await hashPassword(password),
    };
  }
}

function makeLogin(loginInfo = requiredParams('loginInfo')) {
  const validLoginInfo = validate(loginInfo);
  const normalLoginInfo = normalize(validLoginInfo);
  return Object.freeze(normalLoginInfo);

  function validate({
    emailAddress = requiredParams('emailAddress'),
    password = requiredParams('password'),
    ...otherInfo
  }) {
    validateEmail(emailAddress);
    validatePassword(password, 'password');
    return {
      ...otherInfo,
      emailAddress,
      password,
    };
  }
  function normalize({ emailAddress, password, ...otherInfo }) {
    return {
      emailAddress: emailAddress.toLowerCase(),
      password,
      ...otherInfo,
    };
  }
}

function validateEmail(emailAddress) {
  if (!isValidEmail(emailAddress)) {
    throw new InvalidPropertyError(
      `${emailAddress} is not valid email address.`
    );
  }
}
function validatePassword(password, label) {
  if (password.length < 6) {
    throw new InvalidPropertyError(`${label} must be at least 6 symbols long.`);
  }
}
function validateConfirmPassword(password, confirmPassword) {
  if (password !== confirmPassword) {
    throw new InvalidPropertyError(
      'password and confimr password do not match.'
    );
  }
}

module.exports = {
  makeRegister,
  makeLogin,
};
