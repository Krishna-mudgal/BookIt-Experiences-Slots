const express = require("express");
const cors = require("cors");
const {connectMongo} = require("./connections");
const {experienceRoute} = require("./routes/experience");
require('dotenv').config();

const mongoUrl = process.env.MONGO_URL;
connectMongo(mongoUrl).then(() => console.log("MongoDb Connected")).catch(() => console.log("MongoDb disconnected"));

const app = express();

app.use(cors());
app.use(express.json());
app.use("/experiences", experienceRoute);

app.listen(3000, () => console.log('Server running on port 3000'));