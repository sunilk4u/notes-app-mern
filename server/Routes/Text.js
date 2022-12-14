const express = require("express");
const router = express.Router();
const {
  fetchData,
  writeData,
  deleteFile,
  fetchAll,
  downloadFile
} = require("../Controllers/Text");
const verifyToken = require("../Middlewares/VerifyToken");

//fetch data from user's file
router.post("/fetch", verifyToken, fetchData);

//get all list of notes of user
router.post("/fetchall", verifyToken, fetchAll);

//write the updated data into file
router.put("/write", verifyToken, writeData);

//delete file
router.post("/delete", verifyToken, deleteFile);

//download file
router.get("/download/:id", verifyToken, downloadFile);

module.exports = router;
