const mongoose = require("mongoose");
const Currency = require("../models/currency.model");

const getCurrencyByName = async (req, res) => {
  const { name } = req.params;
  const data = await Currency.findOne({ code: name });

  if (!data) {
    return res.status(404).json({ error: "No such currency" });
  }

  res.status(200).json(data);
};

module.exports = getCurrencyByName;
