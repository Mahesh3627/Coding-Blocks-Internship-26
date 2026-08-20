const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const {
    bookEvent,
    getMyBookings,
    cancelBooking,
    getOrganizerBookings,
    getAllBookings
} = require("../controllers/bookingController");

router.post(
    "/:eventId",
    protect,
    authorize("public"),
    bookEvent
);

router.get(
    "/my",
    protect,
    authorize("public"),
    getMyBookings
);

router.put(
    "/cancel/:id",
    protect,
    authorize("public"),
    cancelBooking
);

router.get(
    "/organizer/all",
    protect,
    authorize("organizer", "admin"),
    getOrganizerBookings
);

router.get(
    "/admin/all",
    protect,
    authorize("admin"),
    getAllBookings
);

module.exports = router;