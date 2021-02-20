module.exports = function (db) {
  return Object.freeze({
    register,
    login,
  });
  async function register({ emailAddress, hashedPassword }) {
    // todo: save to db

    return {
      emailAddress,
      hashedPassword,
    };
  }
  function login({ emailAddress, password }) {}
};
