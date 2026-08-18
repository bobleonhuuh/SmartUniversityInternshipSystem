import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../services/api";

function MyApplication() {

    const user = JSON.parse(
        localStorage.getItem("user") || "null"
    );

    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    // ==========================================
    // LOAD APPLICATIONS
    // ==========================================

    useEffect(() => {

        const loadApplications = async () => {

            if (!user?.id) {

                setError(
                    "Please login to view your applications."
                );

                setLoading(false);

                return;

            }

            try {

                // First get the student's actual student_id

                const studentResponse =
                    await api.get(
                        `/students/${user.id}`
                    );

                const student =
                    studentResponse.data?.student;

                if (!student) {

                    throw new Error(
                        "Student profile not found."
                    );

                }


                // Then get applications using student_id

                const response =
                    await api.get(
                        `/applications/student/${student.student_id}`
                    );


                const data =
                    Array.isArray(response.data)
                        ? response.data
                        : response.data?.applications || [];


                setApplications(data);

            } catch (err) {

                console.error(
                    "Applications error:",
                    err
                );

                setError(
                    err.response?.data?.message ||
                    err.message ||
                    "Unable to load applications."
                );

            } finally {

                setLoading(false);

            }

        };

        loadApplications();

    }, []);


    // ==========================================
    // STATUS BADGE
    // ==========================================

    const getStatusClass = (status) => {

        switch (status) {

            case "Accepted":
                return "bg-success";

            case "Rejected":
                return "bg-danger";

            case "Reviewed":
                return "bg-info text-dark";

            case "Pending":
            default:
                return "bg-warning text-dark";

        }

    };


    // ==========================================
    // PAGE
    // ==========================================

    return (

        <>
            <Navbar />

            <div className="container my-5">

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <div>

                        <h2>
                            My Applications
                        </h2>

                        <p className="text-muted">
                            Track the internships you have
                            applied for.
                        </p>

                    </div>

                    <span className="badge bg-primary fs-6">

                        {applications.length} Application
                        {applications.length !== 1
                            ? "s"
                            : ""}

                    </span>

                </div>


                {/* ERROR */}

                {error && (

                    <div className="alert alert-danger">

                        {error}

                    </div>

                )}


                {/* LOADING */}

                {loading && (

                    <div className="text-center py-5">

                        <div
                            className="spinner-border text-primary"
                            role="status"
                        />

                        <p className="text-muted mt-3">
                            Loading applications...
                        </p>

                    </div>

                )}


                {/* EMPTY */}

                {!loading &&
                    !error &&
                    applications.length === 0 && (

                        <div className="card p-5 text-center">

                            <h5>
                                No applications yet
                            </h5>

                            <p className="text-muted">

                                You haven't applied for any
                                internships yet.

                            </p>

                            <a
                                href="/internships"
                                className="btn btn-primary"
                            >
                                Browse Internships
                            </a>

                        </div>

                    )}


                {/* APPLICATIONS */}

                {!loading &&
                    applications.map((application) => (

                        <div
                            className="card shadow-sm mb-3"
                            key={
                                application.application_id
                            }
                        >

                            <div className="card-body">

                                <div className="row align-items-center">

                                    {/* INTERNSHIP */}

                                    <div className="col-md-5">

                                        <h5 className="mb-1">

                                            {application.title ||
                                                "Internship"}

                                        </h5>

                                        <p className="text-muted mb-1">

                                            📍{" "}
                                            {application.location ||
                                                "Location not specified"}

                                        </p>

                                        {application.category && (

                                            <small className="text-muted">

                                                {application.category}

                                            </small>

                                        )}

                                    </div>


                                    {/* DATE */}

                                    <div className="col-md-3">

                                        <small className="text-muted d-block">

                                            Applied On

                                        </small>

                                        <strong>

                                            {application.application_date
                                                ? new Date(
                                                    application.application_date
                                                ).toLocaleDateString()
                                                : "N/A"}

                                        </strong>

                                    </div>


                                    {/* STATUS */}

                                    <div className="col-md-2">

                                        <small className="text-muted d-block mb-1">

                                            Status

                                        </small>

                                        <span
                                            className={`badge ${getStatusClass(
                                                application.status
                                            )}`}
                                        >

                                            {application.status ||
                                                "Pending"}

                                        </span>

                                    </div>


                                    {/* DETAILS */}

                                    <div className="col-md-2 text-md-end mt-3 mt-md-0">

                                        <button
                                            className="btn btn-outline-primary btn-sm"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target={`#application-${application.application_id}`}
                                        >
                                            View Details
                                        </button>

                                    </div>

                                </div>


                                {/* DETAILS */}

                                <div
                                    className="collapse mt-4"
                                    id={`application-${application.application_id}`}
                                >

                                    <hr />

                                    <h6>
                                        Cover Letter
                                    </h6>

                                    <p className="text-muted">

                                        {application.cover_letter ||
                                            "No cover letter provided."}

                                    </p>


                                    {application.description && (

                                        <>

                                            <h6>
                                                Internship Description
                                            </h6>

                                            <p className="text-muted">

                                                {
                                                    application.description
                                                }

                                            </p>

                                        </>

                                    )}


                                    {application.deadline && (

                                        <p className="small text-muted">

                                            <strong>
                                                Application Deadline:
                                            </strong>{" "}

                                            {new Date(
                                                application.deadline
                                            ).toLocaleDateString()}

                                        </p>

                                    )}

                                </div>

                            </div>

                        </div>

                    ))}

            </div>

            <Footer />

        </>

    );

}

export default MyApplication;