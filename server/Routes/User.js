const express = require("express");
const router = express.Router();
const verifyToken = require("../Middlewares/VerifyToken");
const {
  loginUser,
  signUpUser,
  updateUser,
  deleteUser,
  userDetails,
  userLogout,
} = require("../Controllers/User");

//get user from the database
router.post("/login", loginUser);

//logout user and remove auth token
router.post("/logout", userLogout);

//get user about details from the database
router.post("/details", verifyToken, userDetails);

//create user in the databse
router.post("/register", signUpUser);

//update user data in database
router.patch("/update", verifyToken, updateUser);

//delete user from the database
router.delete("/deregister", verifyToken, deleteUser);

module.exports = router;
