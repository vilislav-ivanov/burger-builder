const makeHttpError = require('../helpers/http-error');
const { makeLogin } = require('./auth');
const {
  InvalidPropertyError,
  RequiredParamsError,
  WrongCredentialsError,
} = require('../helpers/errors');

module.exports = function makeLoginHandler(repo) {
  return async function loginHandler(httpRequest) {
    switch (httpRequest.method) {
      case 'POST':
        return login(httpRequest);
      default:
        return makeHttpError({
          statusCode: 405,
          errorMessage: `${httpRequest.method} method not allowed`,
        });
    }
  };
  async function login({ body }) {
    try {
      const loginInfo = makeLogin(body);
      const result = await repo.login(loginInfo);
      return {
        headers: {
          'Content-Type': 'application/json',
        },
        statusCode: 200,
        data: JSON.stringify(result),
      };
    } catch (error) {
      return makeHttpError({
        statusCode:
          error instanceof InvalidPropertyError ||
          error instanceof RequiredParamsError ||
          error instanceof WrongCredentialsError
            ? 400
            : 500,
        errorMessage: error.message,
      });
    }
  }
};
