const ResponseError = (res, statusCode, errorMessage) => {
  return res.status(statusCode).json({
    error: errorMessage
  });
};

export default ResponseError;
