const express = require("express");
const router = express.Router();
const {
  loginUser,
  signUpUser,
  updateUser,
  deleteUser,
} = require("../Controllers/User");

//get user from the database
router.post("/login", loginUser);

//create user in the databse
router.post("/register", signUpUser);

//update user data in database
router.patch("/update"), updateUser;

//delete user from the database
router.delete("/deregister", deleteUser);

module.exports = router;
