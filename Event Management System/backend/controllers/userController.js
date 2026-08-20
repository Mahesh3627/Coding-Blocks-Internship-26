const User = require("../models/User");


// ADMIN - Get all users
exports.getUsers = async (req, res) => {

    try {

        const users = await User.find()
            .select("-password")
            .sort({ createdAt: -1 });

        res.json(users);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};


// ADMIN - Get organizers
exports.getOrganizers = async (req, res) => {

    try {

        const organizers = await User.find({
            role: "organizer"
        }).select("-password");

        res.json(organizers);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};


// ADMIN - Update user
exports.updateUser = async (req, res) => {

    try {

        const user = await User.findById(
            req.params.id
        );

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const {
            name,
            email,
            phone,
            role
        } = req.body;

        user.name = name ?? user.name;
        user.email = email ?? user.email;
        user.phone = phone ?? user.phone;
        user.role = role ?? user.role;

        await user.save();

        res.json({
            message: "User updated successfully",
            user
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};


// ADMIN - Delete user
exports.deleteUser = async (req, res) => {

    try {

        const user = await User.findById(
            req.params.id
        );

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        await user.deleteOne();

        res.json({
            message: "User deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};