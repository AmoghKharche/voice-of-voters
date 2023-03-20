const mongoose = require("mongoose");

const voterSchema = new mongoose.Schema({
  voterid: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  ward: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Voter", voterSchema);
