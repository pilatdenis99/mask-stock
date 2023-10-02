const mongoose = require("mongoose");

const countrySchema = new mongoose.Schema({
  countryCode: String,
  countryName: String,
  currencyCode: String,
  population: String,
  capital: String,
  continentName: String,
});

module.exports = mongoose.model("Country", countrySchema);
