const express = require("express");
const router = express.Router();
const { fetchData, writeData, deleteFile } = require("../Controllers/Text");

//fetch data from user's file
router.post("/fetch", fetchData);

//write the updated data into file
router.put("/write", writeData);

//delete file
router.delete("/delete", deleteFile)

module.exports = router;
