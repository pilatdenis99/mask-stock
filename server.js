require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const hospitalRoutes = require("./routes/hospitals");
const userRoutes = require("./routes/user");
const orderRoutes = require("./routes/orders");
const countryRoutes = require("./routes/countries");
const currencyRoutes = require("./routes/currency");
//express app
const app = express();

//middleware
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
//routes
app.use("/api/hospitals/", hospitalRoutes);
app.use("/api/user/", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/countries", countryRoutes);
app.use("/api/currency", currencyRoutes);

//connect ot db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //listen for request
    console.log("");
    app.listen(process.env.PORT, () => {
      console.log("Connected to database and listening on port 4000");
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
