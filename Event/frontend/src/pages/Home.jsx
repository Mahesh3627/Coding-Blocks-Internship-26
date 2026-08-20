import {
    Link
} from "react-router-dom";

import {
    useEffect,
    useState
} from "react";

import API from "../services/api";

import EventCard from "../components/EventCard";


const Home = () => {

    const [events, setEvents] =
        useState([]);


    useEffect(() => {

        API.get("/events")
            .then(res => {
                setEvents(
                    res.data.slice(0, 6)
                );
            });

    }, []);


    return (

        <>

            <section className="hero">

                <div className="hero-content">

                    <div className="hero-badge">
                        ✨ Discover unforgettable experiences
                    </div>

                    <h1>
                        Your next
                        <span>
                            {" "}great experience
                        </span>
                        {" "}starts here.
                    </h1>

                    <p>
                        Discover concerts, technology
                        conferences, workshops, exhibitions
                        and amazing experiences happening
                        around you.
                    </p>

                    <div className="hero-buttons">

                        <Link
                            to="/events"
                            className="primary-btn"
                        >
                            Explore Events
                        </Link>

                        <Link
                            to="/register"
                            className="secondary-btn"
                        >
                            Join EventHub
                        </Link>

                    </div>

                </div>


                <div className="hero-visual">

                    <div className="floating-card card-one">
                        🎵 Live Music
                    </div>

                    <div className="floating-card card-two">
                        💻 Tech Events
                    </div>

                    <div className="floating-card card-three">
                        🎨 Art & Culture
                    </div>

                    <div className="hero-circle">
                        <span>EVENT</span>
                        <strong>HUB</strong>
                    </div>

                </div>

            </section>


            <section className="section">

                <div className="section-heading">

                    <div>
                        <span>
                            TRENDING NOW
                        </span>

                        <h2>
                            Popular Events
                        </h2>
                    </div>

                    <Link
                        to="/events"
                        className="view-all"
                    >
                        View all →
                    </Link>

                </div>


                <div className="events-grid">

                    {events.map(event => (
                        <EventCard
                            key={event._id}
                            event={event}
                        />
                    ))}

                </div>

            </section>


            <section className="features">

                <div className="feature">

                    <div className="feature-icon">
                        🔎
                    </div>

                    <h3>
                        Discover
                    </h3>

                    <p>
                        Find exciting events
                        happening around you.
                    </p>

                </div>


                <div className="feature">

                    <div className="feature-icon">
                        🎟
                    </div>

                    <h3>
                        Book Instantly
                    </h3>

                    <p>
                        Reserve your spot with
                        one simple click.
                    </p>

                </div>


                <div className="feature">

                    <div className="feature-icon">
                        📅
                    </div>

                    <h3>
                        Enjoy
                    </h3>

                    <p>
                        Manage all your bookings
                        from one place.
                    </p>

                </div>

            </section>

        </>
    );
};

export default Home;