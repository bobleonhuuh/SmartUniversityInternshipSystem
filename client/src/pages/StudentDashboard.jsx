import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import ReadinessRing from "../components/ReadinessRing";
import api from "../services/api";
import { computeMatch, computeReadinessScore, extractSkills } from "../utils/skillMatch";

function StudentDashboard() {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const [applications, setApplications] = useState([]);
    const [internships, setInternships] = useState([]);
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            api.get(`/applications/student/${user.id}`),
            api.get("/internships"),
            api.get(`/students/${user.id}`)
        ])
            .then(([appsRes, internshipsRes, studentRes]) => {
                setApplications(appsRes.data);
                setInternships(internshipsRes.data);
                setStudent(studentRes.data.student);
            })
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    const accepted = applications.filter((a) => a.status === "Accepted").length;
    const pending = applications.filter((a) => a.status === "Pending").length;

    const readiness = student
        ? computeReadinessScore(
            { ...student, gpa: student.cgpa, resume_path: student.cv },
            applications.length
        )
        : { score: 0, label: "Getting Started" };

    const appliedIds = new Set(applications.map((a) => a.internship_id));

    const recommended = internships
        .filter((i) => i.status === "Open" && !appliedIds.has(i.internship_id))
        .map((i) => ({ ...i, match: computeMatch(student?.skills, i.required_skills || i.description) }))
        .sort((a, b) => (b.match.matchScore || 0) - (a.match.matchScore || 0))
        .slice(0, 3);

    const mySkills = extractSkills(student?.skills);

    return (
        <>
            <Navbar />

            <div className="d-flex">
                <Sidebar role="student" />

                <div className="container-fluid p-4">
                    <div className="row g-4 mb-4 align-items-stretch">
                        <div className="col-lg-9">
                            <h2 className="mb-1">Welcome back, {user?.full_name?.split(" ")[0]}! 👋</h2>
                            <p className="text-muted mb-4">You're doing great! Keep applying and building your future.</p>

                            <div className="row g-3">
                                <div className="col-6 col-md-3">
                                    <div className="stat-card text-center">
                                        <h3>{applications.length}</h3>
                                        <p>Applications Submitted</p>
                                    </div>
                                </div>
                                <div className="col-6 col-md-3">
                                    <div className="stat-card text-center">
                                        <h3>{pending}</h3>
                                        <p>Pending Applications</p>
                                    </div>
                                </div>
                                <div className="col-6 col-md-3">
                                    <div className="stat-card text-center">
                                        <h3>{accepted}</h3>
                                        <p>Approved Applications</p>
                                    </div>
                                </div>
                                <div className="col-6 col-md-3">
                                    <div className="stat-card text-center">
                                        <h3>{recommended.length}</h3>
                                        <p>Recommended For You</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-3">
                            <div className="stat-card h-100 d-flex flex-column align-items-center justify-content-center">
                                <p className="text-muted small mb-2">Career Readiness Score</p>
                                <ReadinessRing score={readiness.score} label={readiness.label} sublabel="Keep it up!" />
                            </div>
                        </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5 className="mb-0">Recommended Internships For You</h5>
                        <Link to="/internships" className="small">View all</Link>
                    </div>

                    {loading && <p>Loading...</p>}

                    <div className="row g-3 mb-5">
                        {recommended.map((i) => (
                            <div className="col-md-4" key={i.internship_id}>
                                <div className="card dashboard-card p-3 h-100 d-flex flex-column justify-content-between">
                                    <div>
                                        <div className="d-flex justify-content-between align-items-start">
                                            <h6 className="fw-bold mb-1">{i.title}</h6>
                                            {i.match.matchScore !== null && (
                                                <span className="badge badge-success-soft">
                                                    Match {i.match.matchScore}%
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-muted small mb-1">{i.company_name}</p>
                                        <p className="text-muted small mb-2">📍 {i.location}</p>
                                    </div>
                                    <Link to="/internships" className="btn btn-primary btn-sm mt-2">
                                        Apply Now
                                    </Link>
                                </div>
                            </div>
                        ))}
                        {!loading && recommended.length === 0 && (
                            <p className="text-muted">
                                No recommendations yet — browse internships and add skills to your profile to improve matching.
                            </p>
                        )}
                    </div>

                    <div className="text-center mb-4">
                        <span className="section-pill">CAREER READINESS</span>
                    </div>

                    <div className="row g-3 mb-5">
                        <div className="col-md-4">
                            <div className="card p-4 h-100">
                                <h6 className="fw-bold mb-3">Profile Checklist</h6>
                                {[
                                    ["CV Uploaded", !!student?.cv],
                                    ["Skills Added", mySkills.length > 0],
                                    ["Course & Department Set", !!student?.course && !!student?.department],
                                    ["CGPA Recorded", !!student?.cgpa],
                                    ["Contact Info", !!student?.phone]
                                ].map(([label, done]) => (
                                    <p key={label} className="mb-2">
                                        <span className={done ? "text-success" : "text-warning"}>
                                            {done ? "✅" : "⏳"}
                                        </span>{" "}
                                        {label}
                                        <span className="text-muted small ms-2">
                                            {done ? "Completed" : "In Progress"}
                                        </span>
                                    </p>
                                ))}
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card p-4 h-100 d-flex flex-column align-items-center justify-content-center text-center">
                                <ReadinessRing score={readiness.score} size={130} />
                                <h6 className="fw-bold mt-3">{readiness.label} Progress</h6>
                                <p className="text-muted small">
                                    Keep improving your profile to unlock better opportunities.
                                </p>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card p-4 h-100">
                                <h6 className="fw-bold mb-3">Recommendations</h6>
                                <ul className="small text-muted ps-3 mb-3">
                                    {!student?.cv && <li className="mb-2">Upload your CV to boost your profile.</li>}
                                    {mySkills.length < 3 && <li className="mb-2">Add more skills to your profile.</li>}
                                    {!student?.cgpa && <li className="mb-2">Add your CGPA for better matching.</li>}
                                    {applications.length === 0 && <li className="mb-2">Apply to your first internship.</li>}
                                </ul>
                                <Link to="/profile" className="btn btn-primary btn-sm align-self-start">
                                    Update Profile
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="text-center mb-4">
                        <span className="section-pill">SKILL GAP ANALYSIS</span>
                    </div>

                    <div className="row g-3 mb-4">
                        <div className="col-md-6">
                            <div className="card p-4 h-100">
                                <h6 className="fw-bold mb-3">Your Skills</h6>
                                {mySkills.length === 0 && (
                                    <p className="text-muted small">
                                        No skills listed yet — add some in your profile.
                                    </p>
                                )}
                                {mySkills.map((s) => (
                                    <p key={s} className="mb-2 text-success">✔ {s}</p>
                                ))}
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="card p-4 h-100">
                                <h6 className="fw-bold mb-3">Skills In Demand You're Missing</h6>
                                {recommended.length === 0 && (
                                    <p className="text-muted small">
                                        Browse internships to see which skills employers are asking for.
                                    </p>
                                )}
                                {Array.from(new Set(recommended.flatMap((i) => i.match.missing))).slice(0, 6).map((s) => (
                                    <p key={s} className="mb-2 text-warning">◐ {s}</p>
                                ))}
                            </div>
                        </div>
                    </div>

                    <h5 className="mb-3">My Applications</h5>

                    {!loading && applications.length === 0 && (
                        <p className="text-muted">You haven't applied to any internships yet.</p>
                    )}

                    {applications.map((app) => (
                        <div className="card p-3 mb-3" key={app.application_id}>
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 className="mb-1">{app.title}</h6>
                                    <p className="text-muted small mb-0">
                                        {app.company_name} · {app.location}
                                    </p>
                                </div>
                                <span
                                    className={`badge ${
                                        app.status === "Accepted"
                                            ? "badge-success-soft"
                                            : app.status === "Rejected"
                                            ? "badge-danger-soft"
                                            : "badge-warning-soft"
                                    }`}
                                >
                                    {app.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Footer />
        </>
    );
}

export default StudentDashboard;
