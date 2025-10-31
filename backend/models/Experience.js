const mongoose = require("mongoose");

const experienceSchema = mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    location: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    price: { 
        type: Number, 
        required: true 
    },
    slots: [
        {
            date: { type: String, required: true },
            times: [
                {
                    time: { type: String, required: true },
                    capacity: { type: Number, required: true },
                    booked: { type: Number, default: 0 }
                }
            ]
        }
    ]
});

const experienceModel = mongoose.model("Experience", experienceSchema);

module.exports = {
    experienceModel
}