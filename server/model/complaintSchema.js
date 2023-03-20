const mongoose = require("mongoose");

const uid = crypto.getRandomValues();

const complaintSchema = new mongoose.Schema(
  {
    complaint: { type: String, required: true },
    name: String,
    ward: Number,
    tag: String,
    uid: uid().String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Complaint", complaintSchema);
