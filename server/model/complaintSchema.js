const mongoose = require("mongoose");
const ShortUniqueId = require("short-unique-id");
const uid = new ShortUniqueId({ length: 6 });
const moment = require("moment-timezone");

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
    ticketid: { type: String, default: uid(), min: 5, unique: true },
    createdAt: {
      type: Date,
      default: () => moment().tz("Asia/Calcutta").format(),
    },
  }
  // { timestamps: true }
);

module.exports = mongoose.model("Complaint", complaintSchema);
