import {
    useEffect,
    useState
} from "react";

import {
    Link,
    useNavigate,
    useParams
} from "react-router-dom";

import API from "../services/api";

import { useAuth } from "../context/AuthContext";


const EventDetails = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const { user } = useAuth();

    const [event, setEvent] =
        useState(null);

    const [message, setMessage] =
        useState("");

    const [error, setError] =
        useState("");


    useEffect(() => {

        API.get(`/events/${id}`)
            .then(res => {
                setEvent(res.data);
            })
            .catch(() => {
                setError("Event not found");
            });

    }, [id]);


    const handleBooking = async () => {

        if (!user) {
            navigate("/login");
            return;
        }

        if (user.role !== "public") {
            setError(
                "Only public users can book tickets."
            );
            return;
        }

        try {

            const response =
                await API.post(
                    `/bookings/${id}`
                );

            setMessage(
                response.data.message
            );

            const updated =
                await API.get(
                    `/events/${id}`
                );

            setEvent(updated.data);

        } catch (err) {

            setError(
                err.response?.data?.message ||
                "Booking failed"
            );

        }
    };


    if (!event) {
        return (
            <div className="loading">
                Loading...
            </div>
        );
    }


    const available =
        event.capacity -
        event.bookedSeats;


    return (

        <div className="details-page">

            <div className="details-image">

                <img
                    src={`${event.image}?auto=format&fit=crop&w=1400&q=85`}
                    alt={event.title}
                />

                <span>
                    {event.category}
                </span>

            </div>


            <div className="details-content">

                <div className="details-date">
                    {new Date(
                        event.date
                    ).toLocaleDateString(
                        "en-IN",
                        {
                            weekday: "long",
                            day: "numeric",
                            month: "long",
                            year: "numeric"
                        }
                    )}
                </div>


                <h1>
                    {event.title}
                </h1>


                <p className="details-description">
                    {event.description}
                </p>


                <div className="details-info">

                    <div>
                        <strong>
                            📍 Location
                        </strong>

                        <p>
                            {event.venue},
                            {event.city}
                        </p>
                    </div>


                    <div>
                        <strong>
                            🕐 Time
                        </strong>

                        <p>
                            {event.time}
                        </p>
                    </div>


                    <div>
                        <strong>
                            🎟 Availability
                        </strong>

                        <p>
                            {available} /
                            {event.capacity}
                        </p>
                    </div>


                    <div>
                        <strong>
                            👤 Organizer
                        </strong>

                        <p>
                            {event.organizer?.name}
                        </p>
                    </div>

                </div>


                {message && (
                    <div className="success-message">
                        ✓ {message}
                    </div>
                )}


                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}


                <div className="booking-area">

                    {available > 0 ? (

                        user?.role === "public" ? (

                            <button
                                className="book-btn"
                                onClick={handleBooking}
                            >
                                Book My Ticket →
                            </button>

                        ) : user ? (

                            <div className="login-required">
                                Public users can book
                                tickets.
                            </div>

                        ) : (

                            <Link
                                to="/login"
                                className="book-btn"
                            >
                                Login to Book →
                            </Link>

                        )

                    ) : (

                        <button
                            disabled
                            className="book-btn disabled"
                        >
                            Event Fully Booked
                        </button>

                    )}

                </div>

            </div>

        </div>
    );
};

export default EventDetails;