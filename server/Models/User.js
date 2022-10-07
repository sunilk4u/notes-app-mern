const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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
    about: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

//hash password before saving it into the database
userSchema.pre("save", async function (next) {
  let user = this;

  if (!user.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);

  user.password = hash;
  next();
});

//create user model
const User = mongoose.model("user", userSchema);

module.exports = User;
