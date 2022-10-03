const express = require("express");
const router = express.Router();

//fetch data from user's file
router.post("/fetch");

//write the updated data into file
router.put("/write");

module.exports = router;
