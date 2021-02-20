const { makeRegister } = require('./auth');
const makeHttpError = require('../helpers/http-error');
const {
  InvalidPropertyError,
  RequiredParamsError,
} = require('../helpers/errors');

module.exports = function makeRegisterHandler(repo) {
  return async function handleRegister(httpRequest) {
    switch (httpRequest.method) {
      case 'POST':
        return register(httpRequest);
      default:
        return makeHttpError({
          statusCode: 405,
          errorMessage: `${httpRequest.method} method not allowed`,
        });
    }

    async function register({ body }) {
      try {
        const registerInfo = await makeRegister(body);
        const result = await repo.register(registerInfo);
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
            error instanceof RequiredParamsError
              ? 400
              : 500,
          errorMessage: error.message,
        });
      }
    }
  };
};
