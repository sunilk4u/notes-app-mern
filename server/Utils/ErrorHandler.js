const ErrorHandler = (req, res, status, msg) => {
  res.status(status);
  res.json({
    status: status,
    message: msg,
  });
};

module.exports = ErrorHandler;
