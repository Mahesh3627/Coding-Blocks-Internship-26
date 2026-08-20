const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

const User = require("../models/User");
const Event = require("../models/Event");

dotenv.config();

const seedData = async () => {

    try {

        await mongoose.connect(
            process.env.MONGO_URI
        );

        console.log("MongoDB connected");

        await User.deleteMany({});
        await Event.deleteMany({});


        const password = await bcrypt.hash(
            "123456",
            10
        );


        const admin = await User.create({
            name: "System Admin",
            email: "admin@eventhub.com",
            password,
            role: "admin",
            phone: "9876543210"
        });


        const organizer1 = await User.create({
            name: "Arjun Events",
            email: "arjun@eventhub.com",
            password,
            role: "organizer",
            phone: "9876543211"
        });


        const organizer2 = await User.create({
            name: "Creative Events",
            email: "creative@eventhub.com",
            password,
            role: "organizer",
            phone: "9876543212"
        });


        await User.create([
            {
                name: "Rahul Kumar",
                email: "rahul@gmail.com",
                password,
                role: "public"
            },
            {
                name: "Priya Sharma",
                email: "priya@gmail.com",
                password,
                role: "public"
            },
            {
                name: "Amit Singh",
                email: "amit@gmail.com",
                password,
                role: "public"
            }
        ]);


        await Event.create([

            {
                title: "Jaipur Music Festival",
                description:
                    "An energetic evening filled with live music, amazing performances and unforgettable memories.",
                category: "Music",
                date: new Date("2026-09-15"),
                time: "06:30 PM",
                venue: "JECC",
                city: "Jaipur",
                image:
                    "https://images.unsplash.com/photo-1501386761578-eac5c94b800a",
                capacity: 500,
                organizer: organizer1._id
            },

            {
                title: "Tech Innovation Summit",
                description:
                    "Discover the latest technologies, AI innovations and future trends from technology experts.",
                category: "Technology",
                date: new Date("2026-09-20"),
                time: "10:00 AM",
                venue: "Birla Auditorium",
                city: "Jaipur",
                image:
                    "https://images.unsplash.com/photo-1505373877841-8d25f7d46678",
                capacity: 300,
                organizer: organizer1._id
            },

            {
                title: "Startup Networking Night",
                description:
                    "Meet entrepreneurs, founders, investors and innovators in an exciting networking environment.",
                category: "Business",
                date: new Date("2026-09-25"),
                time: "07:00 PM",
                venue: "Clarks Amer",
                city: "Jaipur",
                image:
                    "https://images.unsplash.com/photo-1556761175-b413da4baf72",
                capacity: 250,
                organizer: organizer2._id
            },

            {
                title: "Art & Culture Exhibition",
                description:
                    "Explore contemporary art, traditional artwork and creative installations from talented artists.",
                category: "Art",
                date: new Date("2026-10-02"),
                time: "11:00 AM",
                venue: "Jawahar Kala Kendra",
                city: "Jaipur",
                image:
                    "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342",
                capacity: 200,
                organizer: organizer2._id
            },

            {
                title: "Coding Bootcamp",
                description:
                    "A practical coding workshop covering web development, programming and software engineering.",
                category: "Education",
                date: new Date("2026-10-10"),
                time: "09:00 AM",
                venue: "Tech Hub Jaipur",
                city: "Jaipur",
                image:
                    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
                capacity: 100,
                organizer: organizer1._id
            },

            {
                title: "Food Carnival",
                description:
                    "Taste delicious food from different cuisines while enjoying live entertainment.",
                category: "Food",
                date: new Date("2026-10-18"),
                time: "05:00 PM",
                venue: "Central Park",
                city: "Jaipur",
                image:
                    "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f",
                capacity: 700,
                organizer: organizer2._id
            }

        ]);


        console.log("Seed data inserted successfully");

        console.log("");
        console.log("LOGIN DETAILS");
        console.log("------------------------------");

        console.log(
            "Admin: admin@eventhub.com / 123456"
        );

        console.log(
            "Organizer: arjun@eventhub.com / 123456"
        );

        console.log(
            "Organizer: creative@eventhub.com / 123456"
        );

        console.log(
            "Public: rahul@gmail.com / 123456"
        );

        console.log("------------------------------");


        process.exit();

    } catch (error) {

        console.error(error);

        process.exit(1);
    }
};

seedData();