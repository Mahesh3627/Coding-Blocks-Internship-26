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


const Login = () => {

    const navigate = useNavigate();

    const {
        login
    } = useAuth();


    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [error, setError] =
        useState("");


    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const data =
                await login(
                    email,
                    password
                );


            if (data.user.role === "admin") {
                navigate("/admin");

            } else if (
                data.user.role === "organizer"
            ) {
                navigate("/organizer");

            } else {
                navigate("/");
            }

        } catch (err) {

            setError(
                err.response?.data?.message ||
                "Login failed"
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
                    Welcome back
                </h1>

                <p>
                    Login to continue your
                    event journey.
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
                        Email
                    </label>

                    <input
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        required
                    />


                    <label>
                        Password
                    </label>

                    <input
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        required
                    />


                    <button
                        className="auth-submit"
                    >
                        Login
                    </button>

                </form>


                <p className="auth-bottom">
                    Don't have an account?
                    {" "}
                    <Link to="/register">
                        Create account
                    </Link>
                </p>

            </div>

        </div>
    );
};

export default Login;