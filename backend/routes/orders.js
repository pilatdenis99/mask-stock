const express = require("express");
const { placeOrder, getOrders } = require("../controllers/ordersController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();
router.use(requireAuth);

router.post("/:id", placeOrder);
router.get("/:id", getOrders);

module.exports = router;
