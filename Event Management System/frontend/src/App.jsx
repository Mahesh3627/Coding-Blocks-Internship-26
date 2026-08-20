import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Navbar from "./components/Navbar";

import ProtectedRoute
    from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyBookings from "./pages/MyBookings";
import AdminDashboard from "./pages/AdminDashboard";
import OrganizerDashboard from "./pages/OrganizerDashboard";
import ManageEvents from "./pages/ManageEvents";
import CreateEvent from "./pages/CreateEvent";


function App() {

    return (

        <BrowserRouter>

            <Navbar />

            <Routes>

                {/* Public */}

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/events"
                    element={<Events />}
                />

                <Route
                    path="/events/:id"
                    element={<EventDetails />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />


                {/* Public user */}

                <Route
                    element={
                        <ProtectedRoute
                            roles={["public"]}
                        />
                    }
                >

                    <Route
                        path="/my-bookings"
                        element={
                            <MyBookings />
                        }
                    />

                </Route>


                {/* Organizer */}

                <Route
                    element={
                        <ProtectedRoute
                            roles={["organizer"]}
                        />
                    }
                >

                    <Route
                        path="/organizer"
                        element={
                            <OrganizerDashboard />
                        }
                    />

                    <Route
                        path="/organizer/events"
                        element={
                            <ManageEvents />
                        }
                    />

                    <Route
                        path="/organizer/create-event"
                        element={
                            <CreateEvent />
                        }
                    />

                </Route>


                {/* Admin */}

                <Route
                    element={
                        <ProtectedRoute
                            roles={["admin"]}
                        />
                    }
                >

                    <Route
                        path="/admin"
                        element={
                            <AdminDashboard />
                        }
                    />

                    <Route
                        path="/admin/create-event"
                        element={
                            <CreateEvent />
                        }
                    />

                </Route>

            </Routes>

        </BrowserRouter>
    );
}

export default App;