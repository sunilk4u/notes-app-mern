const mongoose = require("mongoose");

//text file schema
const textSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//create text model
const Text = mongoose.model("text", textSchema);

module.exports = Text;
