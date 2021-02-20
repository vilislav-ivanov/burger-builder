const bcrypt = require('bcrypt');

async function hashPassword(password) {
  try {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  } catch (error) {
    throw error;
  }
}

async function compareEncryptedPassword(encrypted, password) {
  try {
    return await bcrypt.compare(password, encrypted);
  } catch (error) {
    throw error;
  }
}

module.exports = {
  hashPassword,
  compareEncryptedPassword,
};
