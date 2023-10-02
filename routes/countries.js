const express = require("express");
const getCountries = require("../controllers/coutriesController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();
router.use(requireAuth);

router.get("/", getCountries);

module.exports = router;
