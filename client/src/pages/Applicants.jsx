import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Applicants() {

    const { internshipId } = useParams();

    const [applications, setApplications] = useState([]);

    useEffect(() => {
        loadApplicants();
    }, []);

    const loadApplicants = () => {

        axios
            .get(`http://localhost:5001/api/employers/internships/${internshipId}/applications`)
            .then(res => setApplications(res.data.applications))
            .catch(console.log);

    };

    const updateStatus = (applicationId, status) => {

        axios
            .put(`http://localhost:5001/api/applications/${applicationId}/status`, {
                status
            })
            .then(() => loadApplicants())
            .catch(console.log);

    };

    return (

        <>
            <Navbar />

            <div className="container mt-5">

                <h2 className="mb-4">Applicants</h2>

                <table className="table table-bordered table-striped">

                    <thead className="table-dark">

                        <tr>

                            <th>Name</th>
                            <th>Registration</th>
                            <th>Course</th>
                            <th>CGPA</th>
                            <th>Skills</th>
                            <th>Cover Letter</th>
                            <th>Status</th>
                            <th>Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {applications.map(app => (

                            <tr key={app.application_id}>

                                <td>{app.first_name} {app.last_name}</td>

                                <td>{app.registration_number}</td>

                                <td>{app.course}</td>

                                <td>{app.cgpa}</td>

                                <td>{app.skills}</td>

                                <td>{app.cover_letter}</td>

                                <td>
                                    <span className="badge bg-primary">
                                        {app.status}
                                    </span>
                                </td>

                                <td>

                                    <button
                                        className="btn btn-success btn-sm me-2"
                                        onClick={() => updateStatus(app.application_id, "Accepted")}
                                    >
                                        Accept
                                    </button>

                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() => updateStatus(app.application_id, "Reviewed")}
                                    >
                                        Review
                                    </button>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => updateStatus(app.application_id, "Rejected")}
                                    >
                                        Reject
                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

            <Footer />

        </>

    );

}

export default Applicants;