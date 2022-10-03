const User = require("../Models/User");
const ErrorHandler = require("../Utils/ErrorHandler");

//get user from the database
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });
    if (user) {
      if (password === user.password) {
        res.status(200).json({
          _id: user._id,
          name: user.name,
          email: user.email,
        });
      } else {
        res.status(401).json({
          status: 401,
          message: "Password did not match",
        });
      }
    } else {
      res.status(404).json({
        status: 404,
        message: "User not registered",
      });
    }
  } catch (err) {
    console.log(err);
    return ErrorHandler(req, res, 500, "Internal server error");
  }
};

//create user in database
const signUpUser = async (req, res) => {
  const { name, email, password } = req.body;

  //field validation
  if (!name || !email || !password) {
    return ErrorHandler(req, res, 400, "Invalid field values");
  } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return ErrorHandler(req, res, 400, "Invalid Email");
  } else if (password.length < 8 || !/\d/.test(password)) {
    return ErrorHandler(req, res, 400, "Weak Password");
  } else if (name.length < 4) {
    return ErrorHandler(
      req,
      res,
      400,
      "Name length should be greater than 3 characters"
    );
  }

  //check if user is already present
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      return ErrorHandler(req, res, 400, "User is already registered");
    } else if (err) {
      return ErrorHandler(req, res, 500, err.message);
    } else {
      const user = new User({
        name,
        email,
        password,
      });

      //if user is not present then save it
      user.save((err) => {
        if (err) {
          return ErrorHandler(req, res, 500, err.message);
        } else {
          res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
          });
        }
      });
    }
  });
};

//update user in database
const updateUser = async (req, res) => {
  const { _id, name, email, password } = req.body;

  //if id is not provided then reject the request
  if (!_id) {
    return ErrorHandler(
      req,
      res,
      400,
      "Request is rejected because of invalid user id."
    );
  } else {
    const user = await User.findById(_id);

    //check if user is present with given id
    if (!user) {
      return ErrorHandler(req, res, 404, "User not found.");
    } else {
      //if name is provided and validates then update name
      if (name && name.length > 3) {
        user.name = name;
      }
      //if email is provided and validates then update name
      if (
        email &&
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
      ) {
        user.email = email;
      }
      //if password is provided and validates then update name
      if (password && (password.length < 8 || !/\d/.test(password))) {
        user.password = password;
      }

      //after updating values save the data in database
      user.save((err) => {
        if (err) {
          return ErrorHandler(req, res, 500, err.message);
        }

        res.status(200).json({
          _id: _id,
          name: user.name,
          email: user.email,
          password: user.password,
        });
      });
    }
  }
};

//delete user in database
const deleteUser = (req, res) => {
  res.send("ok");
};

module.exports = {
  loginUser,
  signUpUser,
  updateUser,
  deleteUser,
};
