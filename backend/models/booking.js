const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
    experienceId : {
        type: String,
        required: true
    },
    userName : {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    qty: {
        type: String,
        required: true
    },
    price: { 
        type: Number, 
        required: true 
    },
    taxes: { 
        type: Number, 
        required: true 
    },
    promoCode: { 
        type: String, 
        default: null 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
})

const bookingModel = mongoose.model("Booking", bookingSchema);

module.exports = {
    bookingModel
}