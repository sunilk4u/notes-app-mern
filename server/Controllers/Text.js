const fs = require("fs");
const ErrorHandler = require("../Utils/ErrorHandler");
const Text = require("../Models/Text");
const fileDir = "./Data/";

//get text data into file
const fetchData = async (req, res) => {
  const { _id } = req.body;

  //check if text is provided or not
  if (!_id) {
    return ErrorHandler(req, res, 400, "Text id not provided");
  } else {
    const text = Text.findOne({ _id: _id });

    //check if text file is present with given id
    if (!text) {
      return ErrorHandler(req, res, 404, "File not found in directory");
    } else {
      //read data from file and send it to client
      console.log(fileDir + _id + ".txt");
      fs.readFile(fileDir + _id + ".txt", "utf-8", function (err, data) {
        if (err) {
          console.log(err);
          return ErrorHandler(req, res, 500, "Unable to read data");
        }

        res.set("Content-Type", "text/plain");
        res.status(200).send(data);
      });
    }
  }
};

//write text data into file
const writeData = (req, res) => {
  res.send("ok");
};

module.exports = {
  fetchData,
  writeData,
};
