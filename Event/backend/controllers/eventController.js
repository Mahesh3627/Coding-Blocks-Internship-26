const Event = require("../models/Event");
const Booking = require("../models/Booking");


// PUBLIC - Get all events
exports.getEvents = async (req, res) => {

    try {

        const events = await Event.find()
            .populate("organizer", "name email")
            .sort({ date: 1 });

        res.json(events);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};


// PUBLIC - Get single event
exports.getEvent = async (req, res) => {

    try {

        const event = await Event.findById(req.params.id)
            .populate("organizer", "name email");

        if (!event) {
            return res.status(404).json({
                message: "Event not found"
            });
        }

        res.json(event);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};


// ADMIN - Create event
// ORGANIZER - Create event
exports.createEvent = async (req, res) => {

    try {

        const {
            title,
            description,
            category,
            date,
            time,
            venue,
            city,
            image,
            capacity,
            organizer
        } = req.body;

        let organizerId = req.user._id;

        if (req.user.role === "admin" && organizer) {
            organizerId = organizer;
        }

        const event = await Event.create({
            title,
            description,
            category,
            date,
            time,
            venue,
            city,
            image,
            capacity,
            organizer: organizerId
        });

        res.status(201).json(event);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};


// ADMIN - Update any event
// ORGANIZER - Update own event
exports.updateEvent = async (req, res) => {

    try {

        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({
                message: "Event not found"
            });
        }

        if (
            req.user.role === "organizer" &&
            event.organizer.toString() !== req.user._id.toString()
        ) {
            return res.status(403).json({
                message: "You can only update your own events"
            });
        }

        Object.assign(event, req.body);

        await event.save();

        res.json(event);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};


// ADMIN - Delete any event
// ORGANIZER - Delete own event
exports.deleteEvent = async (req, res) => {

    try {

        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({
                message: "Event not found"
            });
        }

        if (
            req.user.role === "organizer" &&
            event.organizer.toString() !== req.user._id.toString()
        ) {
            return res.status(403).json({
                message: "You can only delete your own events"
            });
        }

        await Booking.deleteMany({
            event: event._id
        });

        await event.deleteOne();

        res.json({
            message: "Event deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};


// ORGANIZER - Own events
exports.getMyEvents = async (req, res) => {

    try {

        const events = await Event.find({
            organizer: req.user._id
        }).sort({ date: 1 });

        res.json(events);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};