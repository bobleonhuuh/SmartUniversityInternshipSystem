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
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");

    useEffect(() => {
        api.get("/internships")
            .then((res) => setInternships(res.data))
            .catch(() => setError("Unable to load internships right now."))
            .finally(() => setLoading(false));

        if (user?.role === "student") {
            api.get("/applications/mine")
                .then((res) => setMyApplications(res.data))
                .catch(() => {});

            api.get("/students/me")
                .then((res) => setMySkills(res.data?.skills || ""))
                .catch(() => {});
        }
    }, []);

    const appliedInternshipIds = new Set(
        myApplications.map((app) => app.internship_id)
    );

    const handleApply = async (internship) => {
        try {
            await api.post("/applications", { internship_id: internship.internship_id });
            setMyApplications((prev) => [
                ...prev,
                { internship_id: internship.internship_id, status: "Pending" }
            ]);
            alert("Application submitted successfully!");
        } catch (err) {
            alert(err.response?.data?.message || "Unable to submit application.");
        }
    };

    const filtered = internships.filter((i) => {
        const term = search.toLowerCase();
        return (
            i.title.toLowerCase().includes(term) ||
            i.company_name.toLowerCase().includes(term) ||
            (i.location || "").toLowerCase().includes(term)
        );
    });

    return (
        <>
            <Navbar />

            <div className="container mt-5 mb-5">
                <h2 className="mb-4">Browse Internships</h2>

                <input
                    className="form-control mb-4"
                    placeholder="Search by title, company, or location..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                {loading && <p>Loading internships...</p>}
                {error && <p className="text-danger">{error}</p>}
                {!loading && !error && filtered.length === 0 && (
                    <p className="text-muted">No internships found.</p>
                )}

                {filtered.map((internship) => (
                    <InternshipCard
                        key={internship.internship_id}
                        internship={internship}
                        onApply={user?.role === "student" ? handleApply : null}
                        applyDisabled={appliedInternshipIds.has(internship.internship_id)}
                        applyLabel={
                            appliedInternshipIds.has(internship.internship_id) ? "Applied" : "Apply Now"
                        }
                        matchScore={
                            user?.role === "student"
                                ? computeMatch(mySkills, internship.required_skills || internship.description).matchScore
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
