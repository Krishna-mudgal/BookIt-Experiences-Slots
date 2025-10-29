const {experienceModel} = require("../models/Experience");

const handleCreateExperience = async (req, res) => {
    try {
        const {title, location, image, description, price, slots} = req.body;

        if (!title || !location || !image || !description || !price || !slots) {
        return res.status(400).json({ error: "Missing required fields" });
        }
        
        const result = await experienceModel.create({
            title,
            location,
            image,
            description,
            price,
            slots: slots.map((slot) => {
                return {
                    date: slot.date,
                    times: slot.times.map((time) => {
                        return {
                            time: time.time,
                            capacity: time.capacity,
                            booked: time.booked || 0,
                        }
                    })
                }
            })
        });

        res.status(201).json({
        message: "Experience created successfully",
        data: result,
        });
    } catch(err) {
        console.error("Error creating experience:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const handleGetAllExpriences = async (req, res) => {
    try {
        const result = await experienceModel.find({});

        if(!result) {
            return res.status(404).json({
                message: "No data is found"
            })
        } else return res.status(200).json({
            message: "Data fetched successfully",
            data : result
        })
    } catch (error) {
        console.error("Error getting experience:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = {
    handleCreateExperience,
    handleGetAllExpriences
}