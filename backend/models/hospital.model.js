const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    vat: { type: Number, required: true },
    users: [String],
    currency: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hospital", hospitalSchema);
