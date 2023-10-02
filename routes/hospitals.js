const express = require("express");
const {
  getAllHospitals,
  createHospital,
  removeHospital,
  updateHospital,
  getHospitalsName,
  addHospitalToUser,
  getHospitalById,
} = require("../controllers/hospitalsController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();
router.use(requireAuth);

router.get("/", getAllHospitals);
router.get("/id/:id", getHospitalById);
router.get("/name", getHospitalsName);
router.post("/", createHospital);
router.delete("/:id", removeHospital);
router.patch("/:id", updateHospital);
router.patch("/:id", addHospitalToUser);

module.exports = router;
