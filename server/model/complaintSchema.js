const mongoose = require("mongoose");
const ShortUniqueId = require("short-unique-id");
const uid = new ShortUniqueId({ length: 6 });

const complaintSchema = new mongoose.Schema(
  {
    complaint: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    ward: { type: Number, required: true },
    tag: { type: String, required: true },
    ticketId: { type: String, default: uid(), unique: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Complaint", complaintSchema);
