const express = require("express");
const cors = require("cors");
const {connectMongo} = require("./connections");
const {experienceRoute} = require("./routes/experience");
const {bookingRouter} = require("./routes/booking")
const {promoRouter} = require("./routes/promo");
require('dotenv').config();

const mongoUrl = process.env.MONGO_URL;
connectMongo(mongoUrl).then(() => console.log("MongoDb Connected")).catch((e) => console.log("MongoDb disconnected", e));

const app = express();

app.use(cors());
app.use(express.json());
app.use("/experiences", experienceRoute);
app.use("/bookings", bookingRouter);
app.use("/promos", promoRouter);

app.listen(3000,    () => console.log('Server running on port 3000'));