import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import InternshipCard from "../components/Internship";
import api from "../services/api";
import { computeMatch } from "../utils/skillMatch";

function InternshipListing() {

    const user = JSON.parse(localStorage.getItem("user") || "null");

    const [internships, setInternships] = useState([]);
    const [myApplications, setMyApplications] = useState([]);
    const [mySkills, setMySkills] = useState("");
    const [studentId, setStudentId] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");

    // ==========================================
    // LOAD DATA
    // ==========================================

    useEffect(() => {

        const loadData = async () => {

            try {

                setLoading(true);
                setError("");

                // ----------------------------------
                // Load internships
                // ----------------------------------

                const internshipResponse =
                    await api.get("/internships");

                if (Array.isArray(internshipResponse.data)) {

                    setInternships(internshipResponse.data);

                } else if (
                    Array.isArray(internshipResponse.data?.internships)
                ) {

                    setInternships(
                        internshipResponse.data.internships
                    );

                }


                // ----------------------------------
                // Load student information
                // ----------------------------------

                if (user?.role === "student" && user?.id) {

                    const studentResponse =
                        await api.get(`/students/${user.id}`);

                    console.log(
                        "Student profile:",
                        studentResponse.data
                    );

                    const student =
                        studentResponse.data?.student;

                    if (student) {

                        // IMPORTANT:
                        // Use students.student_id
                        // NOT users.id

                        setStudentId(student.student_id);

                        setMySkills(student.skills || "");

                        // ----------------------------------
                        // Load student's applications
                        // ----------------------------------

                        const applicationResponse =
                            await api.get(
                                `/applications/student/${student.student_id}`
                            );

                        setMyApplications(
                            Array.isArray(applicationResponse.data)
                                ? applicationResponse.data
                                : applicationResponse.data?.applications || []
                        );

                    }

                }

            } catch (err) {

                console.error("Loading error:", err);

                setError(
                    err.response?.data?.message ||
                    "Unable to load internships right now."
                );

            } finally {

                setLoading(false);

            }

        };

        loadData();

    }, []);


    // ==========================================
    // APPLICATION IDs
    // ==========================================

    const appliedInternshipIds = new Set(
        myApplications.map(
            (app) => Number(app.internship_id)
        )
    );


    // ==========================================
    // APPLY FOR INTERNSHIP
    // ==========================================

    const handleApply = async (internship) => {

        // Student must be logged in

        if (!user || user.role !== "student") {

            alert("Please login as a student to apply.");

            return;

        }


        // Make sure we successfully loaded student ID

        if (!studentId) {

            alert(
                "Student profile could not be found. Please complete your student profile and try again."
            );

            return;

        }


        try {

            console.log("Submitting application:", {
                internship_id: internship.internship_id,
                student_id: studentId
            });


            await api.post("/applications", {

                internship_id:
                    internship.internship_id,

                // IMPORTANT:
                // This is the real students.student_id

                student_id: studentId,

                cover_letter:
                    "I would like to apply for this internship."

            });


            // Update page immediately

            setMyApplications((prev) => [

                ...prev,

                {
                    internship_id:
                        internship.internship_id,

                    status: "Pending"

                }

            ]);


            alert(
                "Application submitted successfully!"
            );


        } catch (err) {

            console.error(
                "Application error:",
                err
            );

            alert(
                err.response?.data?.message ||
                "Unable to submit application."
            );

        }

    };


    // ==========================================
    // SEARCH
    // ==========================================

    const filtered = internships.filter((internship) => {

        const term = search.toLowerCase();

        return (

            (internship.title || "")
                .toLowerCase()
                .includes(term)

            ||

            (internship.company_name || "")
                .toLowerCase()
                .includes(term)

            ||

            (internship.location || "")
                .toLowerCase()
                .includes(term)

        );

    });


    // ==========================================
    // PAGE
    // ==========================================

    return (

        <>
            <Navbar />

            <div className="container mt-5 mb-5">

                <div className="mb-4">

                    <h2 className="fw-bold">
                        Browse Internships
                    </h2>

                    <p className="text-muted">
                        Find internship opportunities and apply
                        for positions that match your skills.
                    </p>

                </div>


                {/* SEARCH */}

                <input
                    className="form-control mb-4"
                    placeholder="Search by title, company, or location..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                />


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
                            Loading internships...
                        </p>

                    </div>

                )}


                {/* NO RESULTS */}

                {!loading &&
                    !error &&
                    filtered.length === 0 && (

                        <div className="text-center py-5">

                            <h5>
                                No internships found.
                            </h5>

                            <p className="text-muted">
                                Try another search.
                            </p>

                        </div>

                    )}


                {/* INTERNSHIPS */}

                {!loading &&
                    filtered.map((internship) => (

                        <InternshipCard

                            key={
                                internship.internship_id
                            }

                            internship={internship}

                            onApply={
                                user?.role === "student"
                                    ? handleApply
                                    : null
                            }

                            applyDisabled={
                                appliedInternshipIds.has(
                                    Number(
                                        internship.internship_id
                                    )
                                )
                            }

                            applyLabel={
                                appliedInternshipIds.has(
                                    Number(
                                        internship.internship_id
                                    )
                                )
                                    ? "Applied"
                                    : "Apply Now"
                            }

                            matchScore={
                                user?.role === "student"
                                    ? computeMatch(
                                        mySkills,
                                        internship.required_skills ||
                                        internship.description ||
                                        ""
                                    ).matchScore
                                    : null
                            }

                        />

                    ))}

            </div>

            <Footer />

        </>

    );

}

export default InternshipListing;
