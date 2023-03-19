const mongoose = require("mongoose");

const voterSchema = new mongoose.Schema({
  voterid: String,
  name: String,
  ward: Number,
});

module.exports = mongoose.model("Voter", voterSchema);
