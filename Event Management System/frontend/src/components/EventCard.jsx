import { Link } from "react-router-dom";

const EventCard = ({ event }) => {

    const available =
        event.capacity -
        event.bookedSeats;


    return (

        <div className="event-card">
            <div className="event-image-wrapper">
                <img
                    src={`${event.image}?auto=format&fit=crop&w=800&q=80`}
                    alt={event.title}
                    className="event-image"
                />
                <span className="category-badge">
                    {event.category}
                </span>
            </div>


            <div className="event-content">
                <div className="event-date">
                    {new Date(
                        event.date
                    ).toLocaleDateString(
                        "en-IN",
                        {
                            day: "2-digit",
                            month: "short",
                            year: "numeric"
                        }
                    )}
                </div>


                <h3>
                    {event.title}
                </h3>


                <p>
                    {event.description.substring(
                        0,
                        100
                    )}
                    ...
                </p>


                <div className="event-meta">
                    <span>
                        📍 {event.venue}, {event.city}
                    </span>

                    <span>
                        🎟 {available} seats
                    </span>
                </div>


                <Link
                    to={`/events/${event._id}`}
                    className="view-event"
                >
                    View Event →
                </Link>

            </div>

        </div>
    );
};
export default EventCard;