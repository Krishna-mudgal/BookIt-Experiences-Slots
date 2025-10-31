const {bookingModel} = require("../models/booking");
const {experienceModel} = require("../models/Experience");

const handleCreateBooking = async (req, res) => {
    try {
        const { experienceId, userName, userEmail, date, time, qty, price, taxes, promoCode } = req.body;

        if (!experienceId || !userName || !userEmail || !date || !time || !qty || !price || !taxes) return res.status(400).json({ message: 'Missing required booking fields' });

        const experience = await experienceModel.findById(experienceId);
        if(!experience) return res.status(404).json({
            message: "Experience not found"
        })

        const slot = experience.slots.find((s) => s.date === date);
        if(!slot) return res.status(400).json({ message: 'Selected date slot not available' });

        const timeslot = slot.times.find((s) => s.time === time); // here in this we have extracted that whole variable whose timeslot matches with the given time
        if(!timeslot) return res.status(400).json({ message: 'Selected time slot not available' });

        if(timeslot.booked + qty > timeslot.capacity) return res.status(400).json({ message: 'Not enough availability for selected slot' });

        const booking = await bookingModel.create({
            experienceId, 
            userName, 
            userEmail, 
            date, 
            time, 
            qty, 
            price, 
            taxes, 
            promoCode
        })
        
        timeslot.booked += qty; // if we make update through that variable and then save it by doing experience.save() than updation will be reflected back in mongodb.


        await experience.save();
        return res.status(201).json({ message: 'Booking confirmed', booking });


//         1. experience is a full Mongoose document fetched from the database (experienceModel.findById()).

        // 2. slot is a subdocument (an object from the slots array inside experience).

        // 3. timeslot is a nested subdocument inside slot.times.

        // 4.When you do -> timeslot.booked += qty;

        // 5. you’re directly mutating a property (booked) of a subdocument inside the main experience document.

        // 6. When you then call -> await experience.save();

        // 7. Mongoose automatically tracks the change you made in the nested field and performs the proper update query (like $set internally) to persist it back to MongoDB.

    } catch (error) {
        return res.status(500).json({ message: 'Booking creation failed', error: error.message });
    }

}

module.exports = {
    handleCreateBooking
}