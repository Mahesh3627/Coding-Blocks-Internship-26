const express = require("express");

const router = express.Router();

const {
    getEvents,
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent,
    getMyEvents
} = require("../controllers/eventController");

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

router.get("/", getEvents);

router.get("/:id", getEvent);

router.get(
    "/organizer/my-events",
    protect,
    authorize("organizer", "admin"),
    getMyEvents
);

router.post(
    "/",
    protect,
    authorize("admin", "organizer"),
    createEvent
);

router.put(
    "/:id",
    protect,
    authorize("admin", "organizer"),
    updateEvent
);

router.delete(
    "/:id",
    protect,
    authorize("admin", "organizer"),
    deleteEvent
);

module.exports = router;