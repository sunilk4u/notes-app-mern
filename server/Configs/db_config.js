const mongoose = require("mongoose");
const mongoUrl = process.env.MONGO_URL;

//create connection to mongodb
const db_connect = () => {
  mongoose.connect(mongoUrl, (err) => {
    if (err) {
      console.log("Error occoured while connecting to database");
      throw err;
    }

    console.log("-> connected to database");
  });
};

module.exports = db_connect;
