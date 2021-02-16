const { RequiredParamsError } = require('./errors');

const requiredParam = (param) => {
  throw new RequiredParamsError(param);
};

export default requiredParam;
