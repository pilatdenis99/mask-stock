const mongoose = require("mongoose");

const currencySchema = new mongoose.Schema({
  code: String,
  alphaCode: String,
  numericCode: String,
  name: String,
  rate: Number,
  date: String,
  inverseRate: Number,
});

module.exports = mongoose.model("Currency", currencySchema);
