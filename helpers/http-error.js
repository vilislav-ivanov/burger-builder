module.exports = function ({ statusCode, errorMessage }) {
  return {
    headers: {
      'Content-Type': 'application/json',
    },
    statusCode,
    data: JSON.stringify({
      success: false,
      error: errorMessage,
    }),
  };
};
