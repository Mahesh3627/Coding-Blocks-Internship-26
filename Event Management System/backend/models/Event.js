const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            required: true
        },

        category: {
            type: String,
            required: true
        },

        date: {
            type: Date,
            required: true
        },

        time: {
            type: String,
            required: true
        },

        venue: {
            type: String,
            required: true
        },

        city: {
            type: String,
            required: true
        },

        image: {
            type: String,
            required: true
        },

        capacity: {
            type: Number,
            required: true
        },

        bookedSeats: {
            type: Number,
            default: 0
        },

        organizer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Event", eventSchema);