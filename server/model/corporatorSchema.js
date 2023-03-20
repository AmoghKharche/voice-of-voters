const mongoose = require("mongoose");

const corporatorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  ward: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Corporator", corporatorSchema);
