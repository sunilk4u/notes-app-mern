const ErrorHandler = require("../Utils/ErrorHandler");

//get text data into file
const fetchData = (req, res) => {
  res.send("ok");
};

//write text data into file
const writeData = (req, res) => {
  res.send("ok");
};

module.exports = {
  fetchData,
  writeData,
};
