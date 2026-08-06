import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function AdminDashboard() {

    const [students, setStudents] = useState([]);
    const [internships, setInternships] = useState([]);
    const [applications, setApplications] = useState([]);

    useEffect(() => {

        loadData();

    }, []);

    const loadData = () => {

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

    const deleteInternship = async (id) => {

        if (!window.confirm("Delete this internship?")) return;

        try {

            await axios.delete(`http://localhost:5001/api/internships/${id}`);

            alert("Internship deleted successfully.");

            loadData();

        } catch (err) {

            alert("Unable to delete internship.");

        }

    };

    return (

        <>
            <Navbar />

            <div className="container mt-5">

                <h2 className="mb-4">Admin Dashboard</h2>

                <div className="row mb-5">

                    <div className="col-md-4">
                        <div className="card text-center shadow">
                            <div className="card-body">
                                <h2>{students.length}</h2>
                                <h5>Total Students</h5>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card text-center shadow">
                            <div className="card-body">
                                <h2>{internships.length}</h2>
                                <h5>Total Internships</h5>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card text-center shadow">
                            <div className="card-body">
                                <h2>{applications.length}</h2>
                                <h5>Total Applications</h5>
                            </div>
                        </div>
                    </div>

                </div>

                <h3>Students</h3>

                <table className="table table-bordered">

                    <thead className="table-dark">

                        <tr>

                            <th>Name</th>
                            <th>Registration Number</th>
                            <th>Course</th>

                        </tr>

                    </thead>

                    <tbody>

                        {students.map(student => (

                            <tr key={student.student_id}>

                                <td>{student.first_name} {student.last_name}</td>

                                <td>{student.registration_number}</td>

                                <td>{student.course}</td>

                            </tr>

                        ))}

                    </tbody>

                </table>

                <h3 className="mt-5">Internships</h3>

                <table className="table table-bordered">

                    <thead className="table-dark">

                        <tr>

                            <th>Title</th>
                            <th>Location</th>
                            <th>Category</th>
                            <th>Status</th>
                            <th>Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {internships.map(job => (

                            <tr key={job.internship_id}>

                                <td>{job.title}</td>

                                <td>{job.location}</td>

                                <td>{job.category}</td>

                                <td>{job.status}</td>

                                <td>

                                    <button

                                        className="btn btn-danger btn-sm"

                                        onClick={() => deleteInternship(job.internship_id)}

                                    >

                                        Delete

                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

                <h3 className="mt-5">Applications</h3>

                <table className="table table-bordered">

                    <thead className="table-dark">

                        <tr>

                            <th>ID</th>
                            <th>Student</th>
                            <th>Internship</th>
                            <th>Status</th>

                        </tr>

                    </thead>

                    <tbody>

                        {applications.map(app => (

                            <tr key={app.application_id}>

                                <td>{app.application_id}</td>

                                <td>{app.first_name} {app.last_name}</td>

                                <td>{app.title}</td>

                                <td>{app.status}</td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </>

    );

}

export default AdminDashboard;