import {
    useEffect,
    useState
} from "react";

import API from "../services/api";


const ManageEvents = () => {

    const [events, setEvents] =
        useState([]);


    const loadEvents = async () => {

        const response =
            await API.get(
                "/events/organizer/my-events"
            );

        setEvents(response.data);
    };


    useEffect(() => {

        loadEvents();

    }, []);


    const deleteEvent = async (id) => {

        if (
            !window.confirm(
                "Delete this event?"
            )
        ) {
            return;
        }

        await API.delete(
            `/events/${id}`
        );

        loadEvents();
    };


    return (

        <div className="dashboard">

            <div className="dashboard-header">

                <div>

                    <span>
                        EVENT MANAGEMENT
                    </span>

                    <h1>
                        My Events
                    </h1>

                </div>

            </div>


            <div className="manage-event-grid">

                {events.map(event => (

                    <div
                        className="manage-event"
                        key={event._id}
                    >

                        <img
                            src={`${event.image}?auto=format&fit=crop&w=700&q=80`}
                            alt={event.title}
                        />


                        <div>

                            <span>
                                {event.category}
                            </span>

                            <h2>
                                {event.title}
                            </h2>

                            <p>
                                {event.venue},
                                {" "}
                                {event.city}
                            </p>

                            <p>
                                {event.bookedSeats}
                                /
                                {event.capacity}
                                booked
                            </p>


                            <button
                                className="delete-btn"
                                onClick={() =>
                                    deleteEvent(
                                        event._id
                                    )
                                }
                            >
                                Delete Event
                            </button>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
};

export default ManageEvents;