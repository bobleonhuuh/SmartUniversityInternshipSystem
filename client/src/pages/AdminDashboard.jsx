import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../services/api";

function AdminDashboard() {

    const [students, setStudents] = useState([]);
    const [internships, setInternships] = useState([]);
    const [applications, setApplications] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    // ==========================================
    // LOAD ADMIN DATA
    // ==========================================

    useEffect(() => {

        const loadDashboard = async () => {

            try {

                setLoading(true);
                setError("");

                const [
                    studentsResponse,
                    internshipsResponse,
                    applicationsResponse
                ] = await Promise.all([

                    api.get("/students"),

                    api.get("/internships"),

                    api.get("/applications")

                ]);


                // ===============================
                // STUDENTS
                // ===============================

                const studentsData =
                    Array.isArray(studentsResponse.data)
                        ? studentsResponse.data
                        : studentsResponse.data?.students || [];

                setStudents(studentsData);


                // ===============================
                // INTERNSHIPS
                // ===============================

                const internshipsData =
                    Array.isArray(internshipsResponse.data)
                        ? internshipsResponse.data
                        : internshipsResponse.data?.internships || [];

                setInternships(internshipsData);


                // ===============================
                // APPLICATIONS
                // ===============================

                const applicationsData =
                    Array.isArray(applicationsResponse.data)
                        ? applicationsResponse.data
                        : applicationsResponse.data?.applications || [];

                setApplications(applicationsData);


            } catch (err) {

                console.error(
                    "Admin dashboard error:",
                    err
                );

                setError(
                    err.response?.data?.message ||
                    "Unable to load admin dashboard."
                );

            } finally {

                setLoading(false);

            }

        };


        loadDashboard();

    }, []);


    // ==========================================
    // APPLICATION STATUS COUNT
    // ==========================================

    const pendingApplications =
        applications.filter(
            app => app.status === "Pending"
        ).length;

    const acceptedApplications =
        applications.filter(
            app => app.status === "Accepted"
        ).length;

    const rejectedApplications =
        applications.filter(
            app => app.status === "Rejected"
        ).length;


    return (

        <>
            <Navbar />


            <div className="container my-5">

                {/* HEADER */}

                <div className="mb-4">

                    <h2>
                        Admin Dashboard
                    </h2>

                    <p className="text-muted">
                        Manage and monitor the internship
                        placement system.
                    </p>

                </div>


                {/* ERROR */}

                {error && (

                    <div className="alert alert-danger">

                        {error}

                    </div>

                )}


                {/* LOADING */}

                {loading ? (

                    <div className="text-center py-5">

                        <div
                            className="spinner-border text-primary"
                            role="status"
                        />

                        <p className="text-muted mt-3">
                            Loading dashboard...
                        </p>

                    </div>

                ) : (

                    <>

                        {/* =================================
                            STATISTICS
                        ================================== */}

                        <div className="row">

                            <div className="col-md-3 mb-3">

                                <div className="card shadow-sm p-4 text-center">

                                    <h6 className="text-muted">
                                        Total Students
                                    </h6>

                                    <h2 className="text-primary">
                                        {students.length}
                                    </h2>

                                </div>

                            </div>


                            <div className="col-md-3 mb-3">

                                <div className="card shadow-sm p-4 text-center">

                                    <h6 className="text-muted">
                                        Internships
                                    </h6>

                                    <h2 className="text-success">
                                        {internships.length}
                                    </h2>

                                </div>

                            </div>


                            <div className="col-md-3 mb-3">

                                <div className="card shadow-sm p-4 text-center">

                                    <h6 className="text-muted">
                                        Applications
                                    </h6>

                                    <h2 className="text-info">
                                        {applications.length}
                                    </h2>

                                </div>

                            </div>


                            <div className="col-md-3 mb-3">

                                <div className="card shadow-sm p-4 text-center">

                                    <h6 className="text-muted">
                                        Pending
                                    </h6>

                                    <h2 className="text-warning">
                                        {pendingApplications}
                                    </h2>

                                </div>

                            </div>

                        </div>


                        {/* =================================
                            APPLICATION SUMMARY
                        ================================== */}

                        <div className="card shadow-sm mt-4">

                            <div className="card-body">

                                <h5 className="mb-4">
                                    Application Summary
                                </h5>

                                <div className="row text-center">

                                    <div className="col-md-4">

                                        <h4 className="text-success">
                                            {acceptedApplications}
                                        </h4>

                                        <p className="text-muted">
                                            Accepted
                                        </p>

                                    </div>


                                    <div className="col-md-4">

                                        <h4 className="text-danger">
                                            {rejectedApplications}
                                        </h4>

                                        <p className="text-muted">
                                            Rejected
                                        </p>

                                    </div>


                                    <div className="col-md-4">

                                        <h4 className="text-warning">
                                            {pendingApplications}
                                        </h4>

                                        <p className="text-muted">
                                            Pending
                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>


                        {/* =================================
                            STUDENTS
                        ================================== */}

                        <div className="card shadow-sm mt-4">

                            <div className="card-body">

                                <div className="d-flex justify-content-between mb-3">

                                    <h5>
                                        Registered Students
                                    </h5>

                                    <span className="badge bg-primary">
                                        {students.length}
                                    </span>

                                </div>


                                {students.length === 0 ? (

                                    <p className="text-muted">
                                        No students registered yet.
                                    </p>

                                ) : (

                                    <div className="table-responsive">

                                        <table className="table table-hover">

                                            <thead>

                                                <tr>

                                                    <th>
                                                        Name
                                                    </th>

                                                    <th>
                                                        Registration
                                                    </th>

                                                    <th>
                                                        Course
                                                    </th>

                                                    <th>
                                                        Department
                                                    </th>

                                                    <th>
                                                        CGPA
                                                    </th>

                                                </tr>

                                            </thead>


                                            <tbody>

                                                {students
                                                    .slice(0, 10)
                                                    .map(student => (

                                                        <tr
                                                            key={
                                                                student.student_id
                                                            }
                                                        >

                                                            <td>

                                                                {
                                                                    student.first_name
                                                                }{" "}

                                                                {
                                                                    student.last_name
                                                                }

                                                            </td>

                                                            <td>

                                                                {
                                                                    student.registration_number
                                                                }

                                                            </td>

                                                            <td>

                                                                {
                                                                    student.course ||
                                                                    "N/A"
                                                                }

                                                            </td>

                                                            <td>

                                                                {
                                                                    student.department ||
                                                                    "N/A"
                                                                }

                                                            </td>

                                                            <td>

                                                                {
                                                                    student.cgpa ??
                                                                    "N/A"
                                                                }

                                                            </td>

                                                        </tr>

                                                    ))}

                                            </tbody>

                                        </table>

                                    </div>

                                )}

                            </div>

                        </div>


                        {/* =================================
                            INTERNSHIPS
                        ================================== */}

                        <div className="card shadow-sm mt-4">

                            <div className="card-body">

                                <h5 className="mb-3">
                                    Internship Opportunities
                                </h5>


                                {internships.length === 0 ? (

                                    <p className="text-muted">
                                        No internships posted yet.
                                    </p>

                                ) : (

                                    <div className="table-responsive">

                                        <table className="table table-hover">

                                            <thead>

                                                <tr>

                                                    <th>
                                                        Title
                                                    </th>

                                                    <th>
                                                        Location
                                                    </th>

                                                    <th>
                                                        Category
                                                    </th>

                                                    <th>
                                                        Deadline
                                                    </th>

                                                </tr>

                                            </thead>


                                            <tbody>

                                                {internships
                                                    .slice(0, 10)
                                                    .map(internship => (

                                                        <tr
                                                            key={
                                                                internship.internship_id
                                                            }
                                                        >

                                                            <td>

                                                                {
                                                                    internship.title
                                                                }

                                                            </td>

                                                            <td>

                                                                {
                                                                    internship.location ||
                                                                    "N/A"
                                                                }

                                                            </td>

                                                            <td>

                                                                {
                                                                    internship.category ||
                                                                    "N/A"
                                                                }

                                                            </td>

                                                            <td>

                                                                {
                                                                    internship.deadline
                                                                    ? new Date(
                                                                        internship.deadline
                                                                    ).toLocaleDateString()
                                                                    : "N/A"
                                                                }

                                                            </td>

                                                        </tr>

                                                    ))}

                                            </tbody>

                                        </table>

                                    </div>

                                )}

                            </div>

                        </div>


                        {/* =================================
                            APPLICATIONS
                        ================================== */}

                        <div className="card shadow-sm mt-4">

                            <div className="card-body">

                                <h5 className="mb-3">
                                    Recent Applications
                                </h5>


                                {applications.length === 0 ? (

                                    <p className="text-muted">
                                        No applications yet.
                                    </p>

                                ) : (

                                    <div className="table-responsive">

                                        <table className="table table-hover">

                                            <thead>

                                                <tr>

                                                    <th>
                                                        Student
                                                    </th>

                                                    <th>
                                                        Internship
                                                    </th>

                                                    <th>
                                                        Status
                                                    </th>

                                                    <th>
                                                        Date
                                                    </th>

                                                </tr>

                                            </thead>


                                            <tbody>

                                                {applications
                                                    .slice(0, 10)
                                                    .map(application => (

                                                        <tr
                                                            key={
                                                                application.application_id
                                                            }
                                                        >

                                                            <td>

                                                                {
                                                                    application.first_name
                                                                }{" "}

                                                                {
                                                                    application.last_name
                                                                }

                                                            </td>

                                                            <td>

                                                                {
                                                                    application.title ||
                                                                    "N/A"
                                                                }

                                                            </td>

                                                            <td>

                                                                <span
                                                                    className={
                                                                        application.status ===
                                                                        "Accepted"

                                                                            ? "badge bg-success"

                                                                            : application.status ===
                                                                                "Rejected"

                                                                                ? "badge bg-danger"

                                                                                : application.status ===
                                                                                    "Reviewed"

                                                                                    ? "badge bg-info text-dark"

                                                                                    : "badge bg-warning text-dark"
                                                                    }
                                                                >

                                                                    {
                                                                        application.status ||
                                                                        "Pending"
                                                                    }

                                                                </span>

                                                            </td>

                                                            <td>

                                                                {
                                                                    application.application_date
                                                                    ? new Date(
                                                                        application.application_date
                                                                    ).toLocaleDateString()
                                                                    : "N/A"
                                                                }

                                                            </td>

                                                        </tr>

                                                    ))}

                                            </tbody>

                                        </table>

                                    </div>

                                )}

                            </div>

                        </div>

                    </>

                )}

            </div>


            <Footer />

        </>

    );

}

export default AdminDashboard;