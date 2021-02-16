const { RequiredParamsError } = require('./errors');

module.exports = function requiredParam(param) {
  throw new RequiredParamsError(param);
};
