import {
    Link,
    useNavigate
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const Navbar = () => {
    const {
        user,
        logout
    } = useAuth();

    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate("/");
    };


    return (
        <nav className="navbar">
            <Link
                to="/"
                className="logo"
            >
                Event<span>Hub</span>
            </Link>
            <div className="nav-links">
                <Link to="/">
                    Home
                </Link>
                <Link to="/events">
                    Events
                </Link>
                {user?.role === "public" && (
                    <Link to="/my-bookings">
                        My Bookings
                    </Link>
                )}


                {user?.role === "organizer" && (
                    <Link to="/organizer">
                        Organizer Dashboard
                    </Link>
                )}


                {user?.role === "admin" && (
                    <Link to="/admin">
                        Admin Dashboard
                    </Link>
                )}

            </div>


            <div className="nav-actions">

                {user ? (
                    <>
                        <span className="user-pill">
                            {user.name}
                        </span>

                        <button
                            onClick={handleLogout}
                            className="logout-btn"
                        >
                            Logout
                        </button>
                    </>

                ) : (

                    <>
                        <Link
                            to="/login"
                            className="login-btn"
                        >
                            Login
                        </Link>

                        <Link
                            to="/register"
                            className="register-btn"
                        >
                            Register
                        </Link>
                    </>

                )}

            </div>
        </nav>
    );
};
export default Navbar;