module.exports = function adaptHttpRequest(req) {
  return Object.freeze({
    method: req.method,
    pathParams: req.params,
    queryParams: req.query,
    body: req.body,
  });
};
