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
  uploadImage,
} = require("../Controllers/User");
const multer = require("multer");
const path = require("path");

//set storage for multer middleware
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //if public folder is not present then create folder
    const fs = require("fs");
    if (!fs.existsSync("./public")) {
      fs.mkdirSync("./public");
    }
    cb(null, "public/");
  },
  filename: function (req, file, cb) {
    cb(null, req.body._id + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

//get user from the database
router.post("/login", loginUser);

//logout user and remove auth token
router.post("/logout", userLogout);

//get user about details from the database
router.post("/details", verifyToken, userDetails);

//upload user imag
router.post("/upload", [verifyToken, upload.single("file")], uploadImage);

//create user in the databse
router.post("/register", signUpUser);

//update user data in database
router.patch("/update", verifyToken, updateUser);

//delete user from the database
router.post("/deregister", verifyToken, deleteUser);

module.exports = router;
