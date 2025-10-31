const express = require("express");
const {handleCreateBooking} = require("../controllers/booking")

const bookingRouter = express.Router();

bookingRouter.post("/", handleCreateBooking);

module.exports = {
    bookingRouter
}