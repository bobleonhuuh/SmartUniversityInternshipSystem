import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../services/api";

function EmployerDashboard() {

    const user = JSON.parse(
        localStorage.getItem("user") || "null"
    );

    const [internships, setInternships] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    // ==========================================
    // LOAD EMPLOYER INTERNSHIPS
    // ==========================================

    useEffect(() => {

        const loadInternships = async () => {

            if (!user?.id) {

                setError(
                    "Employer account information not found. Please login again."
                );

                setLoading(false);

                return;

            }

            try {

                const response = await api.get(
                    `/employers/${user.id}/internships`
                );

                console.log(
                    "Employer internships:",
                    response.data
                );

                setInternships(
                    response.data?.internships || []
                );

            } catch (err) {

                console.error(
                    "Employer dashboard error:",
                    err
                );

                setError(
                    err.response?.data?.message ||
                    "Unable to load your internships."
                );

            } finally {

                setLoading(false);

            }

        };

        loadInternships();

    }, []);


    return (

        <>
            <Navbar />

            <div className="container my-5">

                {/* HEADER */}

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <div>

                        <h2>
                            Employer Dashboard
                        </h2>

                        <p className="text-muted mb-0">

                            Manage your internship opportunities
                            and applicants.

                        </p>

                    </div>

                    <Link
                        to="/post-internship"
                        className="btn btn-primary"
                    >
                        + Post Internship
                    </Link>

                </div>


                {/* ERROR */}

                {error && (

                    <div className="alert alert-danger">

                        {error}

                    </div>

                )}


                {/* STATISTICS */}

                <div className="row mb-4">

                    <div className="col-md-4 mb-3">

                        <div className="card shadow-sm p-4">

                            <h6 className="text-muted">
                                My Internships
                            </h6>

                            <h2>
                                {internships.length}
                            </h2>

                        </div>

                    </div>

                    <div className="col-md-4 mb-3">

                        <div className="card shadow-sm p-4">

                            <h6 className="text-muted">
                                Active Opportunities
                            </h6>

                            <h2>
                                {
                                    internships.filter(
                                        internship =>
                                            internship.status !==
                                            "Closed"
                                    ).length
                                }
                            </h2>

                        </div>

                    </div>

                    <div className="col-md-4 mb-3">

                        <div className="card shadow-sm p-4">

                            <h6 className="text-muted">
                                Applications
                            </h6>

                            <h2>
                                --
                            </h2>

                            <small className="text-muted">
                                View applicants below
                            </small>

                        </div>

                    </div>

                </div>


                {/* TITLE */}

                <div className="d-flex justify-content-between align-items-center mb-3">

                    <h4>
                        My Internship Opportunities
                    </h4>

                    <Link
                        to="/post-internship"
                        className="btn btn-outline-primary btn-sm"
                    >
                        Post New Internship
                    </Link>

                </div>


                {/* LOADING */}

                {loading && (

                    <div className="text-center py-5">

                        <div
                            className="spinner-border text-primary"
                            role="status"
                        />

                        <p className="text-muted mt-3">
                            Loading internships...
                        </p>

                    </div>

                )}


                {/* EMPTY */}

                {!loading &&
                    !error &&
                    internships.length === 0 && (

                        <div className="card p-5 text-center">

                            <h5>
                                No internships posted yet
                            </h5>

                            <p className="text-muted">
                                Post your first internship
                                opportunity to start receiving
                                applications.
                            </p>

                            <Link
                                to="/post-internship"
                                className="btn btn-primary"
                            >
                                Post Internship
                            </Link>

                        </div>

                    )}


                {/* INTERNSHIPS */}

                {!loading &&
                    internships.map((internship) => (

                        <div
                            className="card shadow-sm mb-3"
                            key={internship.internship_id}
                        >

                            <div className="card-body">

                                <div className="row align-items-center">

                                    {/* DETAILS */}

                                    <div className="col-md-7">

                                        <h5 className="mb-1">

                                            {internship.title}

                                        </h5>

                                        <p className="text-muted mb-1">

                                            📍{" "}
                                            {internship.location ||
                                                "Location not specified"}

                                        </p>

                                        <small className="text-muted">

                                            Category:{" "}
                                            {internship.category ||
                                                "Not specified"}

                                        </small>

                                        {internship.deadline && (

                                            <small className="text-muted d-block mt-1">

                                                Deadline:{" "}
                                                {new Date(
                                                    internship.deadline
                                                ).toLocaleDateString()}

                                            </small>

                                        )}

                                    </div>


                                    {/* STATUS */}

                                    <div className="col-md-2">

                                        <span
                                            className={
                                                internship.status ===
                                                "Closed"
                                                    ? "badge bg-secondary"
                                                    : "badge bg-success"
                                            }
                                        >

                                            {
                                                internship.status ||
                                                "Active"
                                            }

                                        </span>

                                    </div>


                                    {/* ACTION */}

                                    <div className="col-md-3 text-md-end mt-3 mt-md-0">

                                        <Link
                                            to={`/employer/internships/${internship.internship_id}/applications`}
                                            className="btn btn-primary btn-sm"
                                        >
                                            View Applicants
                                        </Link>

                                    </div>

                                </div>

                            </div>

                        </div>

                    ))}

            </div>

            <Footer />

        </>

    );

}

export default EmployerDashboard;