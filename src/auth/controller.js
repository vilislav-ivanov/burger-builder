const { registerHandler } = require('./index');
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

function loginController(req, res) {}

module.exports = {
  registerController,
  loginController,
};
