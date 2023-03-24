const mongoose = require("mongoose");

const CorporatorLoginSchema = new mongoose.Schema({
  ward: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("corporatorLogin", CorporatorLoginSchema);
