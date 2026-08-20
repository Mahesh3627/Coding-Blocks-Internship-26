import {
    useEffect,
    useState
} from "react";

import {
    Link
} from "react-router-dom";

import API from "../services/api";


const OrganizerDashboard = () => {

    const [events, setEvents] =
        useState([]);

    const [bookings, setBookings] =
        useState([]);


    useEffect(() => {

        loadData();

    }, []);


    const loadData = async () => {

        const eventsResponse =
            await API.get(
                "/events/organizer/my-events"
            );

        const bookingsResponse =
            await API.get(
                "/bookings/organizer/all"
            );

        setEvents(
            eventsResponse.data
        );

        setBookings(
            bookingsResponse.data
        );
    };


    return (

        <div className="dashboard">

            <div className="dashboard-header">

                <div>
                    <span>
                        ORGANIZER PANEL
                    </span>

                    <h1>
                        Organizer Dashboard
                    </h1>
                </div>


                <Link
                    to="/organizer/create-event"
                    className="primary-btn"
                >
                    + Create Event
                </Link>

            </div>


            <div className="stats-grid">

                <div className="stat-card">
                    <span>
                        My Events
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
                        Active Events
                    </span>

                    <strong>
                        {
                            events.filter(
                                e =>
                                    new Date(e.date)
                                    >= new Date()
                            ).length
                        }
                    </strong>
                </div>

            </div>


            <section className="dashboard-section">

                <div className="section-title">

                    <h2>
                        My Events
                    </h2>

                    <Link
                        to="/organizer/events"
                    >
                        Manage Events →
                    </Link>

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
                                    {event.category}
                                </small>
                            </div>

                            <span>
                                {event.bookedSeats}
                                /
                                {event.capacity}
                                booked
                            </span>

                            <span>
                                {new Date(
                                    event.date
                                ).toLocaleDateString()}
                            </span>

                        </div>

                    ))}

                </div>

            </section>


            <section className="dashboard-section">

                <div className="section-title">

                    <h2>
                        Recent Bookings
                    </h2>

                </div>


                <div className="admin-table">

                    {bookings.slice(0, 10)
                        .map(booking => (

                            <div
                                className="table-row"
                                key={booking._id}
                            >

                                <div>

                                    <strong>
                                        {booking.user.name}
                                    </strong>

                                    <small>
                                        {booking.user.email}
                                    </small>

                                </div>


                                <span>
                                    {booking.event.title}
                                </span>


                                <span className="status-booked">
                                    Booked
                                </span>

                            </div>

                        ))}

                </div>

            </section>

        </div>
    );
};

export default OrganizerDashboard;