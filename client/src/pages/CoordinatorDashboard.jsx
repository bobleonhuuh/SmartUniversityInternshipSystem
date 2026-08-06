import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function CoordinatorDashboard() {

    const [students, setStudents] = useState([]);
    const [internships, setInternships] = useState([]);
    const [applications, setApplications] = useState([]);

    useEffect(() => {

        loadDashboard();

    }, []);

    const loadDashboard = () => {

        axios.get("http://localhost:5001/api/students")
            .then(res => setStudents(res.data))
            .catch(console.log);

        axios.get("http://localhost:5001/api/internships")
            .then(res => setInternships(res.data))
            .catch(console.log);

        axios.get("http://localhost:5001/api/applications")
            .then(res => setApplications(res.data))
            .catch(console.log);

    };

    return (

        <>
            <Navbar />

            <div className="container my-5">

                <h2 className="mb-4">Coordinator Dashboard</h2>

                <div className="row mb-4">

                    <div className="col-md-4">
                        <div className="card text-center shadow">
                            <div className="card-body">
                                <h2>{students.length}</h2>
                                <p>Total Students</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card text-center shadow">
                            <div className="card-body">
                                <h2>{internships.length}</h2>
                                <p>Total Internships</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card text-center shadow">
                            <div className="card-body">
                                <h2>{applications.length}</h2>
                                <p>Total Applications</p>
                            </div>
                        </div>
                    </div>

                </div>

                <h3>Internships</h3>

                <table className="table table-bordered table-striped">

                    <thead className="table-dark">

                        <tr>
                            <th>Title</th>
                            <th>Company</th>
                            <th>Location</th>
                            <th>Category</th>
                            <th>Status</th>
                        </tr>

                    </thead>

                    <tbody>

                        {internships.map(job => (

                            <tr key={job.internship_id}>

                                <td>{job.title}</td>
                                <td>{job.company_name}</td>
                                <td>{job.location}</td>
                                <td>{job.category}</td>
                                <td>{job.status}</td>

                            </tr>

                        ))}

                    </tbody>

                </table>

                <h3 className="mt-5">Applications</h3>

                <table className="table table-bordered table-striped">

                    <thead className="table-dark">

                        <tr>
                            <th>Application ID</th>
                            <th>Internship</th>
                            <th>Status</th>
                            <th>Date Applied</th>
                        </tr>

                    </thead>

                    <tbody>

                        {applications.map(app => (

                            <tr key={app.application_id}>

                                <td>{app.application_id}</td>
                                <td>{app.title}</td>
                                <td>{app.status}</td>
                                <td>{app.application_date}</td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

            <Footer />

        </>
    );

}

export default CoordinatorDashboard;