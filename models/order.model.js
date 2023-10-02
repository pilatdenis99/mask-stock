const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user_ID: { type: String, required: true },
    hospital_ID: { type: String, required: true },
    hospital_Name: { type: String, required: true },
    items: { type: String, required: true },
    price_Per_Piece: { type: String, required: true },
    ammount: { type: Number, required: true },
    vat: { type: Number, required: true },
    total_Vat: { type: Number, required: true },
    total: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
