import {
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

import API from "../services/api";


const CreateEvent = () => {

    const navigate = useNavigate();


    const [form, setForm] =
        useState({
            title: "",
            description: "",
            category: "Technology",
            date: "",
            time: "",
            venue: "",
            city: "",
            image: "",
            capacity: ""
        });


    const [error, setError] =
        useState("");


    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]:
                e.target.value
        });

    };


    const submit = async (e) => {

        e.preventDefault();

        try {

            await API.post(
                "/events",
                {
                    ...form,
                    capacity:
                        Number(form.capacity)
                }
            );

            navigate("/organizer");

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Could not create event"
            );

        }
    };


    return (

        <div className="form-page">

            <div className="form-container">

                <span>
                    NEW EVENT
                </span>

                <h1>
                    Create an Event
                </h1>

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}


                <form
                    onSubmit={submit}
                    className="event-form"
                >

                    <div className="form-group">

                        <label>
                            Event Name
                        </label>

                        <input
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            required
                        />

                    </div>


                    <div className="form-group">

                        <label>
                            Description
                        </label>

                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            required
                        />

                    </div>


                    <div className="two-column">

                        <div>

                            <label>
                                Category
                            </label>

                            <select
                                name="category"
                                value={form.category}
                                onChange={handleChange}
                            >

                                <option>
                                    Technology
                                </option>

                                <option>
                                    Music
                                </option>

                                <option>
                                    Business
                                </option>

                                <option>
                                    Art
                                </option>

                                <option>
                                    Education
                                </option>

                                <option>
                                    Food
                                </option>

                                <option>
                                    Sports
                                </option>

                            </select>

                        </div>


                        <div>

                            <label>
                                Capacity
                            </label>

                            <input
                                name="capacity"
                                type="number"
                                value={form.capacity}
                                onChange={handleChange}
                                required
                            />

                        </div>

                    </div>


                    <div className="two-column">

                        <div>

                            <label>
                                Date
                            </label>

                            <input
                                name="date"
                                type="date"
                                value={form.date}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        <div>

                            <label>
                                Time
                            </label>

                            <input
                                name="time"
                                type="text"
                                placeholder="06:30 PM"
                                value={form.time}
                                onChange={handleChange}
                                required
                            />

                        </div>

                    </div>


                    <div className="two-column">

                        <div>

                            <label>
                                Venue
                            </label>

                            <input
                                name="venue"
                                value={form.venue}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        <div>

                            <label>
                                City
                            </label>

                            <input
                                name="city"
                                value={form.city}
                                onChange={handleChange}
                                required
                            />

                        </div>

                    </div>


                    <div className="form-group">

                        <label>
                            Event Image URL
                        </label>

                        <input
                            name="image"
                            placeholder="https://..."
                            value={form.image}
                            onChange={handleChange}
                            required
                        />

                    </div>


                    <button
                        className="auth-submit"
                    >
                        Create Event
                    </button>

                </form>

            </div>

        </div>
    );
};

export default CreateEvent;