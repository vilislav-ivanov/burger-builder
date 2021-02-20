const bcrypt = require('bcrypt');
const { InvalidPropertyError } = require('../helpers/errors');
const isValidEmail = require('../helpers/is-valid-email');

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
    validateConfirmPassword(password, confirmPassword);
    return {
      ...otherInfo,
      emailAddress,
      password,
      confirmPassword,
    };

    function validateEmail(emailAddress) {
      if (!isValidEmail(emailAddress)) {
        throw new InvalidPropertyError(`${email} is not valid email address.`);
      }
    }
    function validateConfirmPassword(password, confirmPassword) {
      if (password !== confirmPassword) {
        throw new InvalidPropertyError(
          'password and confimr password do not match.'
        );
      }
    }
  }

  async function normalize({ emailAddress, password }) {
    try {
      const salt = await bcrypt.genSalt(10);
      const encrypted = await bcrypt.hash(password, salt);
      return {
        emailAddress: emailAddress.toLowerCase(),
        hashedPassword: encrypted,
      };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = {
  makeRegister,
};
