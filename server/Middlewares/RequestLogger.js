const reqLogger = (req, res, next) => {
    res.on("finish", () => {
      const method = req.method;
      const status = res.statusCode;
      const url = req.url;
      console.log(`-> ${method}:${status} ${url}`);
    });
    next();
  };
  
  module.exports = reqLogger;