const express = require("express");
const router = express.Router();
const { fetchData, writeData } = require("../Controllers/Text");

//fetch data from user's file
router.post("/fetch", fetchData);

//write the updated data into file
router.put("/write", writeData);

module.exports = router;
