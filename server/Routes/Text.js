const express = require("express");
const router = express.Router();
const { fetchData, writeData, deleteFile } = require("../Controllers/Text");
const verifyToken = require("../Middlewares/VerifyToken");

//fetch data from user's file
router.post("/fetch", verifyToken, fetchData);

//write the updated data into file
router.put("/write", verifyToken, writeData);

//delete file
router.delete("/delete", verifyToken, deleteFile);

module.exports = router;
