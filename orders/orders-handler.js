const {
  DocumentNotFoundError,
  InvalidPropertyError,
  RequiredParamsError,
  UniqueConstraintError,
} = require('../helpers/errors');
const makeHttpError = require('../helpers/http-error');
const makeOrder = require('./order');

module.exports = function makeOrdersEndPoint(orderRepo) {
  return async function (httpRequest) {
    switch (httpRequest.method) {
      case 'POST':
        return handlePost(httpRequest);
      case 'GET':
        return handleGet(httpRequest);
      case 'DELETE':
        return handleDelete(httpRequest);
      default:
        // todo return object with header, statusCode, body
        break;
    }
  };

  async function handlePost({ pathParams, body }) {
    const { id = false } = pathParams;
    try {
      const result = id
        ? await orderRepo.edit({ ...body, orderId: id })
        : await orderRepo.create({ ...order });
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
  function handleGet(httpRequest) {}
  function handleDelete(httpRequest) {}
};
