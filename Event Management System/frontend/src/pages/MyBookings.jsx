import {
    useEffect,
    useState
} from "react";

import API from "../services/api";


const MyBookings = () => {

    const [bookings, setBookings] =
        useState([]);

    const [message, setMessage] =
        useState("");


    const loadBookings = async () => {

        const response =
            await API.get(
                "/bookings/my"
            );

        setBookings(response.data);
    };


    useEffect(() => {

        loadBookings();

    }, []);


    const cancelBooking = async (id) => {

        if (
            !window.confirm(
                "Are you sure you want to cancel this booking?"
            )
        ) {
            return;
        }

        try {

            const response =
                await API.put(
                    `/bookings/cancel/${id}`
                );

            setMessage(
                response.data.message
            );

            loadBookings();

        } catch (error) {

            setMessage(
                error.response?.data?.message ||
                "Cancellation failed"
            );

        }
    };


    return (

        <div className="page">

            <div className="page-header">

                <span>
                    MY ACCOUNT
                </span>

                <h1>
                    My Bookings
                </h1>

                <p>
                    Manage your event reservations.
                </p>

            </div>


            {message && (
                <div className="success-message">
                    {message}
                </div>
            )}


            <div className="booking-list">

                {bookings.length === 0 ? (

                    <div className="empty-state">
                        <div>
                            🎟
                        </div>

                        <h2>
                            No bookings yet
                        </h2>

                        <p>
                            Explore events and
                            book your first ticket.
                        </p>

                    </div>

                ) : (

                    bookings.map(booking => (

                        <div
                            className="booking-card"
                            key={booking._id}
                        >

                            <img
                                src={`${booking.event.image}?auto=format&fit=crop&w=500&q=80`}
                                alt={booking.event.title}
                            />


                            <div className="booking-info">

                                <span>
                                    {booking.event.category}
                                </span>

                                <h2>
                                    {booking.event.title}
                                </h2>

                                <p>
                                    📅{" "}
                                    {new Date(
                                        booking.event.date
                                    ).toLocaleDateString()}
                                </p>

                                <p>
                                    📍{" "}
                                    {booking.event.venue}
                                </p>

                                <p>
                                    Booking ID:
                                    {" "}
                                    {booking._id}
                                </p>

                            </div>


                            <div className="booking-status">

                                <strong
                                    className={
                                        booking.status ===
                                        "booked"
                                            ? "status-booked"
                                            : "status-cancelled"
                                    }
                                >
                                    {booking.status}
                                </strong>


                                {booking.status ===
                                    "booked" && (

                                    <button
                                        onClick={() =>
                                            cancelBooking(
                                                booking._id
                                            )
                                        }
                                        className="cancel-btn"
                                    >
                                        Cancel Booking
                                    </button>

                                )}

                            </div>

                        </div>

                    ))

                )}

            </div>

        </div>
    );
};

export default MyBookings;