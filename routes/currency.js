const express = require("express");
const getCurrencyByName = require("../controllers/currencyController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();
router.use(requireAuth);

router.get("/:name", getCurrencyByName);

module.exports = router;
