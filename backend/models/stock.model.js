const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema({
  quantity: { type: Number, required: true },
});

module.exports = mongoose.model("Stock", stockSchema);
