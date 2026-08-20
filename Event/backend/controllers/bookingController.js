const Booking = require("../models/Booking");
const Event = require("../models/Event");


// PUBLIC USER - Book event
exports.bookEvent = async (req, res) => {

    try {

        const event = await Event.findById(req.params.eventId);

        if (!event) {
            return res.status(404).json({
                message: "Event not found"
            });
        }

        if (event.bookedSeats >= event.capacity) {
            return res.status(400).json({
                message: "Event is fully booked"
            });
        }

        const existingBooking = await Booking.findOne({
            user: req.user._id,
            event: event._id,
            status: "booked"
        });

        if (existingBooking) {
            return res.status(400).json({
                message: "You have already booked this event"
            });
        }

        const booking = await Booking.create({
            user: req.user._id,
            event: event._id
        });

        event.bookedSeats += 1;

        await event.save();

        const populatedBooking = await Booking.findById(
            booking._id
        )
            .populate("event")
            .populate("user", "name email");

        res.status(201).json({
            message: "Ticket booked successfully",
            booking: populatedBooking
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};


// PUBLIC USER - My bookings
exports.getMyBookings = async (req, res) => {

    try {

        const bookings = await Booking.find({
            user: req.user._id
        })
            .populate("event")
            .sort({ createdAt: -1 });

        res.json(bookings);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};


// PUBLIC USER - Cancel booking
exports.cancelBooking = async (req, res) => {

    try {

        const booking = await Booking.findById(
            req.params.id
        ).populate("event");

        if (!booking) {
            return res.status(404).json({
                message: "Booking not found"
            });
        }

        if (
            booking.user.toString() !==
            req.user._id.toString()
        ) {
            return res.status(403).json({
                message: "Not authorized"
            });
        }

        if (booking.status === "cancelled") {
            return res.status(400).json({
                message: "Booking already cancelled"
            });
        }

        booking.status = "cancelled";

        await booking.save();

        await Event.findByIdAndUpdate(
            booking.event._id,
            {
                $inc: {
                    bookedSeats: -1
                }
            }
        );

        res.json({
            message: "Booking cancelled successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};


// ORGANIZER - See bookings on own events
exports.getOrganizerBookings = async (req, res) => {

    try {

        const events = await Event.find({
            organizer: req.user._id
        }).select("_id");

        const eventIds = events.map(
            event => event._id
        );

        const bookings = await Booking.find({
            event: {
                $in: eventIds
            },
            status: "booked"
        })
            .populate("user", "name email phone")
            .populate("event", "title date venue");

        res.json(bookings);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};


// ADMIN - All bookings
exports.getAllBookings = async (req, res) => {

    try {

        const bookings = await Booking.find()
            .populate("user", "name email phone role")
            .populate("event", "title date venue");

        res.json(bookings);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};