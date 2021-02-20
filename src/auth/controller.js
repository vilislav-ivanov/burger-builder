const { registerHandler, loginHandler } = require('./index');
const adaptHttpRequest = require('../helpers/addapt-http-requiest');

async function registerController(req, res) {
  const httpRequest = adaptHttpRequest(req);
  try {
    const { headers, statusCode, data } = await registerHandler(httpRequest);
    return res.set(headers).status(statusCode).send(data);
  } catch (error) {
    return res.status(500).end();
  }
}

async function loginController(req, res) {
  const httpRequest = adaptHttpRequest(req);
  try {
    const { headers, statusCode, data } = await loginHandler(httpRequest);
    return res.set(headers).status(statusCode).send(data);
  } catch (error) {
    return res.status(500).end();
  }
}

module.exports = {
  registerController,
  loginController,
};
