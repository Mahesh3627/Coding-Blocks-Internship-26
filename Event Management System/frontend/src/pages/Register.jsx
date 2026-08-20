import {
    useState
} from "react";

import {
    Link,
    useNavigate
} from "react-router-dom";

import {
    useAuth
} from "../context/AuthContext";


const Register = () => {

    const navigate = useNavigate();

    const {
        register
    } = useAuth();


    const [form, setForm] =
        useState({
            name: "",
            email: "",
            phone: "",
            password: ""
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


    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await register(
                form.name,
                form.email,
                form.password,
                form.phone
            );

            navigate("/");

        } catch (err) {

            setError(
                err.response?.data?.message ||
                "Registration failed"
            );

        }
    };


    return (

        <div className="auth-page">

            <div className="auth-card">

                <div className="auth-brand">
                    Event<span>Hub</span>
                </div>

                <h1>
                    Create your account
                </h1>

                <p>
                    Join EventHub and discover
                    amazing experiences.
                </p>


                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}


                <form
                    onSubmit={handleSubmit}
                >

                    <label>
                        Full Name
                    </label>

                    <input
                        name="name"
                        placeholder="Your name"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />


                    <label>
                        Email
                    </label>

                    <input
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />


                    <label>
                        Phone
                    </label>

                    <input
                        name="phone"
                        placeholder="9876543210"
                        value={form.phone}
                        onChange={handleChange}
                    />


                    <label>
                        Password
                    </label>

                    <input
                        name="password"
                        type="password"
                        placeholder="Minimum 6 characters"
                        value={form.password}
                        onChange={handleChange}
                        minLength="6"
                        required
                    />


                    <button
                        className="auth-submit"
                    >
                        Create Account
                    </button>

                </form>


                <p className="auth-bottom">
                    Already registered?
                    {" "}
                    <Link to="/login">
                        Login
                    </Link>
                </p>

            </div>

        </div>
    );
};

export default Register;