const mongoose = require("mongoose");

//user collection schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name of user is required"],
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//create user model
const User = mongoose.model("user", userSchema);

module.exports = User;
