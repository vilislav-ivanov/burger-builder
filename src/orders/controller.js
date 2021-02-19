const addaptHttpRequest = require('../helpers/addapt-http-requiest');
const handleOrderRequest = require('./index');

module.exports = async function orderController(req, res) {
  const httpRequest = addaptHttpRequest(req);
  try {
    const { headers, statusCode, data } = await handleOrderRequest(httpRequest);
    return res.set(headers).status(statusCode).send(data);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
};
