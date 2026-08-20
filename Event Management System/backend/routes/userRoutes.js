const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const {
    getUsers,
    getOrganizers,
    updateUser,
    deleteUser
} = require("../controllers/userController");

router.get(
    "/",
    protect,
    authorize("admin"),
    getUsers
);

router.get(
    "/organizers",
    protect,
    authorize("admin"),
    getOrganizers
);

router.put(
    "/:id",
    protect,
    authorize("admin"),
    updateUser
);

router.delete(
    "/:id",
    protect,
    authorize("admin"),
    deleteUser
);

module.exports = router;