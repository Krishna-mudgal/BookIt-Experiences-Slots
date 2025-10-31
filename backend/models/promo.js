const mongoose = require("mongoose");

const promoSchema = mongoose.Schema({
    code: {
        type: String,
        required: true,
        uppercase: true,
        unique: true
    },
    type: {
        type: String,
        required: true,
        enum: ["flat", "percent"]
    },
    value :{
        type: Number,
        required: true
    },
    minimumAmount: {
        type: Number,
        default: 0
    },
    isActive: { 
        type: Boolean, 
        default: true 
    },
    expiresAt: { 
        type: Date 
    }
});

const promoModel = mongoose.model("Promo", promoSchema);

module.exports = {
    promoModel
}