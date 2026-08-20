import {
    useEffect,
    useState
} from "react";

import {
    Link
} from "react-router-dom";

import API from "../services/api";


const AdminDashboard = () => {
    const [users, setUsers] =
        useState([]);

    const [events, setEvents] =
        useState([]);

    const [bookings, setBookings] =
        useState([]);

    useEffect(() => {
        loadDashboard();
    }, []);


    const loadDashboard = async () => {

        const [
            usersRes,
            eventsRes,
            bookingsRes
        ] = await Promise.all([

            API.get("/users"),

            API.get("/events"),

            API.get("/bookings/admin/all")

        ]);


        setUsers(usersRes.data);

        setEvents(eventsRes.data);

        setBookings(bookingsRes.data);

    };


    const deleteUser = async (id) => {

        if (
            !window.confirm(
                "Delete this user?"
            )
        ) {
            return;
        }

        await API.delete(
            `/users/${id}`
        );

        loadDashboard();
    };


    return (

        <div className="dashboard">

            <div className="dashboard-header">

                <div>
                    <span>
                        ADMIN PANEL
                    </span>
                    <h1>
                        Control Center
                    </h1>
                </div>


                <Link
                    to="/admin/create-event"
                    className="primary-btn"
                >
                    + Create Event
                </Link>

            </div>


            <div className="stats-grid">

                <div className="stat-card">

                    <span>
                        Total Users
                    </span>
                    <strong>
                        {users.length}
                    </strong>

                </div>


                <div className="stat-card">

                    <span>
                        Total Events
                    </span>

                    <strong>
                        {events.length}
                    </strong>

                </div>


                <div className="stat-card">

                    <span>
                        Total Bookings
                    </span>

                    <strong>
                        {bookings.length}
                    </strong>

                </div>


                <div className="stat-card">

                    <span>
                        Organizers
                    </span>

                    <strong>
                        {
                            users.filter(
                                u =>
                                    u.role ===
                                    "organizer"
                            ).length
                        }
                    </strong>
                </div>
            </div>


            <section className="dashboard-section">
                <div className="section-title">
                    <h2>
                        All Users
                    </h2>
                </div>


                <div className="admin-table">
                    {users.map(user => (
                        <div
                            className="table-row"
                            key={user._id}
                        >
                            <div>
                                <strong>
                                    {user.name}
                                </strong>

                                <small>
                                    {user.email}
                                </small>
                            </div>


                            <span
                                className={`role-${user.role}`}
                            >
                                {user.role}
                            </span>

                            <button
                                className="delete-btn"
                                onClick={() =>
                                    deleteUser(
                                        user._id
                                    )
                                }
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            </section>


            <section className="dashboard-section">
                <div className="section-title">
                    <h2>
                        All Events
                    </h2>
                </div>
                <div className="admin-table">
                    {events.map(event => (
                        <div
                            className="table-row"
                            key={event._id}
                        >

                            <div>
                                <strong>
                                    {event.title}
                                </strong>

                                <small>
                                    {event.organizer?.name}
                                </small>

                            </div>


                            <span>
                                {event.category}
                            </span>


                            <span>
                                {event.bookedSeats}/
                                {event.capacity}
                            </span>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};
export default AdminDashboard;