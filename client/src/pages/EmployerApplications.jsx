import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../services/api";

function EmployerApplications() {

    const { internshipId } = useParams();

    const [applications, setApplications] = useState([]);
    const [internship, setInternship] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [updating, setUpdating] = useState(null);


    // ==========================================
    // LOAD APPLICATIONS
    // ==========================================

    useEffect(() => {

        const loadApplications = async () => {

            try {

                setLoading(true);
                setError("");

                const response =
                    await api.get(
                        `/employers/internships/${internshipId}/applications`
                    );

                console.log(
                    "Employer applications:",
                    response.data
                );

                setApplications(
                    response.data?.applications || []
                );

            } catch (err) {

                console.error(
                    "Applications error:",
                    err
                );

                setError(
                    err.response?.data?.message ||
                    "Unable to load applications."
                );

            } finally {

                setLoading(false);

            }

        };

        loadApplications();

    }, [internshipId]);


    // ==========================================
    // UPDATE STATUS
    // ==========================================

    const updateStatus = async (
        applicationId,
        status
    ) => {

        try {

            setUpdating(applicationId);

            await api.put(
                `/applications/${applicationId}/status`,
                {
                    status
                }
            );


            // Update screen immediately

            setApplications((previous) =>
                previous.map((application) =>
                    application.application_id === applicationId
                        ? {
                            ...application,
                            status
                        }
                        : application
                )
            );

        } catch (err) {

            console.error(
                "Status update error:",
                err
            );

            alert(
                err.response?.data?.message ||
                "Unable to update application status."
            );

        } finally {

            setUpdating(null);

        }

    };


    // ==========================================
    // STATUS BADGE
    // ==========================================

    const statusClass = (status) => {

        switch (status) {

            case "Accepted":
                return "bg-success";

            case "Rejected":
                return "bg-danger";

            case "Reviewed":
                return "bg-info text-dark";

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

                {/* HEADER */}

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <div>

                        <h2>
                            Applicants
                        </h2>

                        <p className="text-muted mb-0">
                            Review students who applied
                            for this internship.
                        </p>

                    </div>

                    <Link
                        to="/employer"
                        className="btn btn-outline-secondary"
                    >
                        ← Back to Dashboard
                    </Link>

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

                            Loading applicants...

                        </p>

                    </div>

                )}


                {/* EMPTY */}

                {!loading &&
                    !error &&
                    applications.length === 0 && (

                        <div className="card p-5 text-center">

                            <h5>
                                No applicants yet
                            </h5>

                            <p className="text-muted">

                                Students who apply for this
                                internship will appear here.

                            </p>

                        </div>

                    )}


                {/* APPLICANTS */}

                {!loading &&
                    applications.map((application) => (

                        <div
                            className="card shadow-sm mb-4"
                            key={application.application_id}
                        >

                            <div className="card-body">

                                <div className="row">

                                    {/* STUDENT */}

                                    <div className="col-md-4">

                                        <h5 className="mb-1">

                                            {application.first_name}{" "}
                                            {application.last_name}

                                        </h5>

                                        <p className="text-muted mb-1">

                                            {
                                                application.registration_number
                                            }

                                        </p>

                                        <p className="mb-1">

                                            <strong>
                                                Course:
                                            </strong>{" "}

                                            {
                                                application.course ||
                                                "Not provided"
                                            }

                                        </p>

                                        <p className="mb-1">

                                            <strong>
                                                Department:
                                            </strong>{" "}

                                            {
                                                application.department ||
                                                "Not provided"
                                            }

                                        </p>

                                        <p className="mb-0">

                                            <strong>
                                                Year:
                                            </strong>{" "}

                                            {
                                                application.year_of_study ||
                                                "N/A"
                                            }

                                        </p>

                                    </div>


                                    {/* SKILLS */}

                                    <div className="col-md-4">

                                        <h6>
                                            Skills
                                        </h6>

                                        <p className="text-muted">

                                            {
                                                application.skills ||
                                                "No skills provided."
                                            }

                                        </p>


                                        <h6 className="mt-3">
                                            CGPA
                                        </h6>

                                        <p>

                                            {
                                                application.cgpa ??
                                                "Not provided"
                                            }

                                        </p>

                                    </div>


                                    {/* STATUS */}

                                    <div className="col-md-4">

                                        <div className="mb-3">

                                            <small className="text-muted d-block">

                                                Current Status

                                            </small>

                                            <span
                                                className={`badge ${statusClass(
                                                    application.status
                                                )}`}
                                            >

                                                {
                                                    application.status ||
                                                    "Pending"
                                                }

                                            </span>

                                        </div>


                                        {/* ACTIONS */}

                                        <div className="d-flex flex-wrap gap-2">

                                            <button
                                                className="btn btn-info btn-sm"
                                                disabled={
                                                    updating ===
                                                    application.application_id
                                                }
                                                onClick={() =>
                                                    updateStatus(
                                                        application.application_id,
                                                        "Reviewed"
                                                    )
                                                }
                                            >

                                                Reviewed

                                            </button>


                                            <button
                                                className="btn btn-success btn-sm"
                                                disabled={
                                                    updating ===
                                                    application.application_id
                                                }
                                                onClick={() =>
                                                    updateStatus(
                                                        application.application_id,
                                                        "Accepted"
                                                    )
                                                }
                                            >

                                                Accept

                                            </button>


                                            <button
                                                className="btn btn-danger btn-sm"
                                                disabled={
                                                    updating ===
                                                    application.application_id
                                                }
                                                onClick={() =>
                                                    updateStatus(
                                                        application.application_id,
                                                        "Rejected"
                                                    )
                                                }
                                            >

                                                Reject

                                            </button>

                                        </div>

                                    </div>

                                </div>


                                {/* COVER LETTER */}

                                <hr />

                                <h6>
                                    Cover Letter
                                </h6>

                                <div className="bg-light rounded p-3">

                                    <p className="mb-0">

                                        {
                                            application.cover_letter ||
                                            "No cover letter provided."
                                        }

                                    </p>

                                </div>


                                {/* CV */}

                                {application.cv && (

                                    <div className="mt-3">

                                        <a
                                            href={
                                                application.cv
                                            }
                                            target="_blank"
                                            rel="noreferrer"
                                            className="btn btn-outline-primary btn-sm"
                                        >
                                            View CV
                                        </a>

                                    </div>

                                )}

                            </div>

                        </div>

                    ))}

            </div>

            <Footer />

        </>

    );

}

export default EmployerApplications;