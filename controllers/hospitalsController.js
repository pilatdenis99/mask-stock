const Hospital = require("../models/hospital.model");
const Country = require("../models/country.model");
const mongoose = require("mongoose");

const getAllHospitals = async (req, res) => {
  const user_id = req.user._id;
  const hospitals = await Hospital.find({ users: user_id });
  res.status(200).json(hospitals);
};

const createHospital = async (req, res) => {
  const { name, city, country, currency } = req.body;

  const hospital = await Hospital.findOne({ name });
  const countryData = await Country.findOne({ countryName: country });

  let emptyFields = [];

  if (!name) {
    emptyFields.push("name");
  }
  if (!city) {
    emptyFields.push("city");
  }
  if (!country) {
    emptyFields.push("country");
  }
  // if (!vat) {
  //   emptyFields.push("vat");
  // }
  if (!currency) {
    emptyFields.push("currency");
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: "Please fill all the fields" });
  }
  if (!hospital) {
    try {
      const user_id = req.user._id;
      const vat =
        countryData.continentName !== "Europe"
          ? "27"
          : countryData.countryName === "Hungary"
          ? "27"
          : "0";
      const newHospital = await Hospital.create({
        name,
        city,
        country,
        vat,
        users: [user_id],
        currency,
      });
      res.status(200).json(newHospital);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

const updateHospital = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such hospital" });
  }

  const hospital = await Hospital.findByIdAndUpdate(id, {
    $push: { users: req.user._id },
  });

  if (!hospital) {
    return res.status(404).json({ error: "No such hospital" });
  }

  res.status(200).json(hospital);
};

const removeHospital = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such hospital" });
  }

  const hospital = await Hospital.findByIdAndUpdate(id, {
    $pull: { users: req.user._id },
  });

  if (!hospital) {
    return res.status(404).json({ error: "No such hospital" });
  }

  res.status(200).json(hospital);
};

const getHospitalsName = async (req, res) => {
  const user_id = req.user._id;
  const hospitals = await Hospital.find({ users: { $ne: user_id } });
  res.status(200).json(hospitals);
};

const addHospitalToUser = async (req, res) => {
  const { id } = req.params;
  const user_id = req.user._id;

  const hospital = await Hospital.findByIdAndUpdate(id, {
    $push: { users: req.user._id },
  });
  res.status(200).json(hospital);
};

const getHospitalById = async (req, res) => {
  const { id } = req.params;
  const hospital = await Hospital.findById(id);
  res.status(200).json(hospital);
};

module.exports = {
  getAllHospitals,
  createHospital,
  updateHospital,
  removeHospital,
  getHospitalsName,
  addHospitalToUser,
  getHospitalById,
};
