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

  async function handlePost({ id = false, body }) {
    try {
      const order = id === false ? makeOrder(body) : null; // no id = creating a new order
      console.log(order);
      const result = id
        ? await orderRepo.edit({ ...body })
        : await orderRepo.create({ ...order });
      return {
        headers: {
          'Content-Type': 'application/json',
        },
        statusCode: 200,
        data: JSON.stringify(result),
      };
    } catch (error) {
      console.log(error.message);
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
