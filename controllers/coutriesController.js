const mongoose = require("mongoose");
const Country = require("../models/country.model");

const getCountries = async (req, res) => {
  const countries = await Country.find({});
  res.status(200).json(countries);
};

module.exports = getCountries;
