import { Link, useNavigate } from "react-router-dom";

const DASHBOARD_PATH = {
    student: "/student",
    employer: "/employer",
    coordinator: "/coordinator",
    admin: "/admin"
};

function Navbar() {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user") || "null");

    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");

    };

    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">

            <div className="container">

                <Link className="navbar-brand fw-bold" to="/">
                    🎓 CareerBridge
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">

                    <ul className="navbar-nav ms-auto">

                        <li className="nav-item">
                            <Link className="nav-link" to="/">
                                Home
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/internships">
                                Internships
                            </Link>
                        </li>

                        {user && (
                            <li className="nav-item">
                                <Link
                                    className="nav-link"
                                    to={DASHBOARD_PATH[user.role]}
                                >
                                    Dashboard
                                </Link>
                            </li>
                        )}

                        {user?.role === "student" && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/profile">
                                        Profile
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link className="nav-link" to="/applications">
                                        My Applications
                                    </Link>
                                </li>
                            </>
                        )}

                        {user?.role === "employer" && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/post-internship">
                                        Post Internship
                                    </Link>
                                </li>
                            </>
                        )}

                        {!user && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">
                                        Login
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link
                                        className="btn btn-light ms-lg-3"
                                        to="/register"
                                    >
                                        Register
                                    </Link>
                                </li>
                            </>
                        )}

                        {user && (
                            <li className="nav-item">

                                <button
                                    className="btn btn-danger ms-lg-3"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>

                            </li>
                        )}

                    </ul>

                </div>

            </div>

        </nav>

    );

}

export default Navbar;