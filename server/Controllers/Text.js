const fs = require("fs");
const ErrorHandler = require("../Utils/ErrorHandler");
const Text = require("../Models/Text");
const User = require("../Models/User");
const fileDir = "./Data/";

//get text data into file
const fetchData = async (req, res) => {
  const { _id } = req.body;

  //check if text is provided or not
  if (!_id) {
    return ErrorHandler(req, res, 400, "Text id not provided");
  } else {
    const text = await Text.findOne({ _id: _id });

    //check if text file is present with given id
    if (!text) {
      return ErrorHandler(req, res, 404, "File not found in directory");
    } else {
      //read data from file and send it to client
      fs.readFile(fileDir + _id + ".txt", "utf-8", function (err, data) {
        if (err) {
          console.log(err);
          return ErrorHandler(req, res, 500, "Unable to read data");
        }

        res.status(200).json({
          _id: text._id,
          file_name: text.name,
          data: data,
        });
      });
    }
  }
};

//fetch all notes list from user
const fetchAll = async (req, res) => {
  const { _id } = req.body;

  //check if inputs ar valid
  if (!_id) {
    return ErrorHandler(req, res, 400, "Invalid fields");
  }

  const user = await User.findById(_id);

  //check user is in database
  if (!user) {
    return ErrorHandler(req, res, 404, "User not found");
  }

  res.status(200).json({
    notes: user.notes,
  });
};

//write text data into file
const writeData = async (req, res) => {
  const { _id, file_name, data, user_id } = req.body;

  //if user_id is not provided then respond with error
  if (!user_id) {
    return ErrorHandler(req, res, 400, "User not logged in");
  }

  //find user in database
  const user = await User.findById(user_id);

  //if user is not found
  if (!user) {
    return ErrorHandler(req, res, 404, "user not found");
  }

  //check if text file with id is already present and payload data is present
  //if both condition are true then perform write operation on existing file.
  if (_id && data) {
    const text = await Text.findById(_id);

    //check if document is present
    if (!text) {
      return ErrorHandler(req, res, 404, "Document not found");
    }
    text.save((err) => {
      if (err) {
        return ErrorHandler(req, res, 500, err.message);
      }
    });

    //write text in file
    fs.writeFile(fileDir + _id + ".txt", data, function (err) {
      if (err) {
        console.log(err);
        return ErrorHandler(req, res, 500, "cannot write data to file");
      }
    });

    res.status(201).json({
      message: "Write action performed",
    });
  } else if (!_id && !data && file_name) {
    //create a new file with file name in database
    const text = new Text({
      name: file_name,
    });

    //save text file data in database
    text.save((err) => {
      if (err) {
        console.log(err);
        return ErrorHandler(req, res, 500, "unable to create file.");
      }
    });

    //if data folder is not present then create folder
    if (!fs.existsSync("./Data")) {
      fs.mkdirSync("./Data");
    }

    //create a text file in directory with empty text
    fs.writeFile(fileDir + text._id + ".txt", "", function (err) {
      if (err) {
        console.log(err);
        return ErrorHandler(req, res, 500, "cannot write data to file");
      }
    });

    //link text file to user profile
    user.notes.push({ _id: text._id, file_name: file_name });
    user.save((err) => {
      if (err) {
        console.log(err);
        return ErrorHandler(req, res, 500, err.message);
      }
    });

    res.status(201).json(text);
  } else if (!_id && !data && !file_name) {
    return ErrorHandler(req, res, 400, "Empty field values");
  } else {
    //if request matches no conditions
    return ErrorHandler(req, res, 404, "Resource not found");
  }
};

//delete file from direcotry and database
const deleteFile = async (req, res) => {
  const { _id, user_id } = req.body;

  //check if id is provided
  if (!_id || !user_id) {
    return ErrorHandler(req, res, 400, "Invalid fields");
  } else {
    //find file in database
    const text = await Text.findById(_id);

    //find user in database
    const user = await User.findById(user_id);

    //check if file with given id is found in database
    if (!text || !user) {
      return ErrorHandler(req, res, 404, "Details not found");
    } else {
      fs.unlinkSync(fileDir + _id + ".txt", function (err) {
        if (err) {
          console.log(err);
        }
      });

      //delete file data from database
      await Text.deleteOne({ _id: _id });

      //unlink file from user model
      await User.updateOne(
        { _id: user._id },
        {
          $pull: {
            notes: { _id: text._id },
          },
        }
      );

      res.status(200).json({
        message: "file deleted",
      });
    }
  }
};

module.exports = {
  fetchData,
  writeData,
  deleteFile,
  fetchAll,
};
