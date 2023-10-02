const mongoose = require("mongoose");
const Order = require("../models/order.model");
const Stock = require("../models/stock.model");

const placeOrder = async (req, res) => {
  const {
    hospitalId,
    hospitalName,
    items,
    pricePerPiece,
    ammount,
    vat,
    totalVat,
    total,
  } = req.body;

  let emptyFields = [];

  const stock = await Stock.findOne({});
  console.log(stock);

  if (!hospitalId) {
    emptyFields.push("hospitalId");
  }
  if (!hospitalName) {
    emptyFields.push("hospitalName");
  }
  if (!items) {
    emptyFields.push("items");
  }
  if (!ammount) {
    emptyFields.push("ammount");
  }

  if (vat !== 0) {
    if (!vat) {
      console.log(!vat);
      emptyFields.push("vat");
    }

    if (!totalVat) {
      console.log(!totalVat);
      emptyFields.push("totalVat");
    }
  }

  if (!total) {
    emptyFields.push("total");
  }

  if (stock.quantity < ammount) {
    return res.status(400).json({
      error: `Maximum available masks: ${new Intl.NumberFormat("en-EN").format(
        stock.quantity
      )}. Please wait until next month for stock refill`,
    });
  }

  if (emptyFields.length > 0) {
    return res.status(400).json({ error: "Please fill all the fields" });
  }

  try {
    const user_id = req.user._id;
    const newOrder = await Order.create({
      user_ID: user_id,
      hospital_ID: hospitalId,
      hospital_Name: hospitalName,
      items,
      price_Per_Piece: pricePerPiece,
      ammount,
      vat: parseInt(vat),
      total_Vat: totalVat,
      total,
    });
    console.log(newOrder);
    const updateStock = await Stock.findByIdAndUpdate(stock._id, {
      quantity: stock.quantity - ammount,
    });
    res.status(200).json(newOrder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getOrders = async (req, res) => {
  const { id } = req.params;
  const user_id = req.user._id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such hospital" });
  }

  const orders = await Order.find({ user_ID: user_id, hospital_ID: id });

  if (!orders) {
    return res.status(404).json({ error: "No such orders" });
  }

  res.status(200).json(orders);
};

module.exports = { placeOrder, getOrders };
