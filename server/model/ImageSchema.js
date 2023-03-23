const mongoose = require("mongoose");

const Image = new mongoose.Schema({
  ticketId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  data: {
    type: Buffer,
    required: true,
  },
  contentType: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Image", Image);
