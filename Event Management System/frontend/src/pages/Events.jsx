import {
    useEffect,
    useState
} from "react";

import API from "../services/api";

import EventCard from "../components/EventCard";


const Events = () => {

    const [events, setEvents] =
        useState([]);

    const [search, setSearch] =
        useState("");

    const [category, setCategory] =
        useState("All");


    useEffect(() => {

        API.get("/events")
            .then(res => {
                setEvents(res.data);
            });

    }, []);


    const categories = [
        "All",
        ...new Set(
            events.map(
                event => event.category
            )
        )
    ];


    const filteredEvents =
        events.filter(event => {

            const matchesSearch =
                event.title
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    );

            const matchesCategory =
                category === "All" ||
                event.category === category;

            return (
                matchesSearch &&
                matchesCategory
            );
        });


    return (

        <div className="page">

            <div className="page-header">

                <span>
                    EXPLORE
                </span>

                <h1>
                    Find Your Next Event
                </h1>

                <p>
                    Discover experiences that
                    match your interests.
                </p>

            </div>


            <div className="event-filters">

                <input
                    type="text"
                    placeholder="Search events..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                />


                <div className="category-buttons">

                    {categories.map(cat => (

                        <button
                            key={cat}
                            className={
                                category === cat
                                    ? "active-category"
                                    : ""
                            }
                            onClick={() =>
                                setCategory(cat)
                            }
                        >
                            {cat}
                        </button>

                    ))}

                </div>

            </div>


            <div className="events-grid">

                {filteredEvents.map(event => (

                    <EventCard
                        key={event._id}
                        event={event}
                    />

                ))}

            </div>

        </div>
    );
};

export default Events;