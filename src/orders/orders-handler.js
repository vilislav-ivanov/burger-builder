const {
  NotFoundError,
  InvalidPropertyError,
  RequiredParamsError,
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
        return makeHttpError({
          statusCode: 405,
          errorMessage: `${httpRequest.method} method not allowed`,
        });
        break;
    }
  };

  async function handlePost({ pathParams, body }) {
    const { id = false } = pathParams;
    try {
      const order = makeOrder(body);
      const result = id
        ? await orderRepo.edit({ ...order, orderId: id })
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
          error instanceof RequiredParamsError ||
          error instanceof NotFoundError
            ? error instanceof NotFoundError
              ? 404
              : 400
            : 500,
        errorMessage: error.message,
      });
    }
  }
  async function handleGet({ pathParams }) {
    const { id } = pathParams;
    try {
      const result = id
        ? await orderRepo.getById(id)
        : await orderRepo.getAll();
      return {
        headers: {
          'Content-Type': 'application/json',
        },
        statusCode: 200,
        data: JSON.stringify(result),
      };
    } catch (error) {
      return makeHttpError({
        statusCode: error instanceof NotFoundError ? 404 : 500,
        errorMessage: error.message,
      });
    }
  }
  async function handleDelete({ pathParams }) {
    const { id = false } = pathParams;
    try {
      const result = await orderRepo.remove(id);
      return {
        headers: { 'Content-Type': 'application/json' },
        statusCode: 200,
        data: JSON.stringify(result),
      };
    } catch (error) {
      return makeHttpError({
        statusCode: error instanceof NotFoundError ? 404 : 500,
        errorMessage: error.message,
      });
    }
  }
};
