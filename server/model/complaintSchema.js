const mongoose = require("mongoose");

const uuid = require("uuid");
const uid = uuid.v4();
console.log(uid);

const complaintSchema = new mongoose.Schema(
  {
    complaint: { type: String, required: true },
    name: String,
    ward: Number,
    tag: String,
    uid: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Complaint", complaintSchema);
