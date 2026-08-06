import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function EmployerDashboard() {

    const user = JSON.parse(localStorage.getItem("user"));

    const [internships, setInternships] = useState([]);

    useEffect(() => {

        loadInternships();

    }, []);

    const loadInternships = () => {

        axios
            .get(`http://localhost:5001/api/employers/${user.id}/internships`)
            .then((res) => {

                setInternships(res.data);

            })
            .catch((err) => {

                console.log(err);

            });

    };

    const deleteInternship = async (id) => {

        if (!window.confirm("Are you sure you want to delete this internship?")) {

            return;

        }

        try {

            await axios.delete(
                `http://localhost:5001/api/internships/${id}`
            );

            alert("Internship deleted successfully.");

            loadInternships();

        } catch (err) {

            alert(err.response?.data?.message || "Unable to delete internship.");

        }

    };

    const updateStatus = async (applicationId, status) => {

    try {

        await axios.put(

            `http://localhost:5001/api/applications/${applicationId}/status`,

            {
                status
            }

        );

        alert(`Application ${status} successfully.`);

        loadApplicants(selectedInternshipId);

    } catch (err) {

        alert(err.response?.data?.message || "Unable to update application.");

    }

};

    return (

        <>

            <Navbar />

            <div className="container mt-5">

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <h2>Employer Dashboard</h2>

                    <Link
                        to="/post-internship"
                        className="btn btn-primary"
                    >
                        Post Internship
                    </Link>

                </div>

                <div className="row mb-4">

                    <div className="col-md-4">

                        <div className="card text-center shadow">

                            <div className="card-body">

                                <h3>{internships.length}</h3>

                                <p>Total Internships</p>

                            </div>

                        </div>

                    </div>

                </div>

                <table className="table table-bordered table-striped">

                    <thead className="table-dark">

                        <tr>

                            <th>Title</th>

                            <th>Category</th>

                            <th>Location</th>

                            <th>Duration</th>

                            <th>Deadline</th>

                            <th>Status</th>

                            <th>Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {internships.length === 0 ? (

                            <tr>

                                <td colSpan="7" className="text-center">

                                    No internships found.

                                </td>

                            </tr>

                        ) : (

                            internships.map((job) => (

                                <tr key={job.internship_id}>

                                    <td>{job.title}</td>

                                    <td>{job.category}</td>

                                    <td>{job.location}</td>

                                    <td>{job.duration}</td>

                                    <td>{job.deadline}</td>

                                    <td>{job.status}</td>

                                    <td>

                                        <button
                                            className="btn btn-info btn-sm me-2"
                                        >
                                            Applicants
                                        </button>

                                        <button
                                            className="btn btn-warning btn-sm me-2"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() =>
                                                deleteInternship(job.internship_id)
                                            }
                                        >
                                            Delete
                                        </button>

                                    </td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

                {selectedInternshipId && (

<div className="mt-5">

<h3>Applicants</h3>

<table className="table table-bordered">

<thead>

<tr>

<th>Name</th>

<th>Registration No.</th>

<th>Course</th>

<th>Cover Letter</th>

<th>Status</th>

<th>Action</th>

</tr>

</thead>

<tbody>

{applicants.map((app) => (

<tr key={app.application_id}>

<td>{app.first_name} {app.last_name}</td>

<td>{app.registration_number}</td>

<td>{app.course}</td>

<td>{app.cover_letter}</td>

<td>

<span className="badge bg-secondary">

{app.status}

</span>

</td>

<td>

<button
className="btn btn-success btn-sm me-2"
onClick={() =>
updateStatus(app.application_id,"Accepted")
}
>

Accept

</button>

<button
className="btn btn-warning btn-sm me-2"
onClick={() =>
updateStatus(app.application_id,"Reviewed")
}
>

Reviewed

</button>

<button
className="btn btn-danger btn-sm"
onClick={() =>
updateStatus(app.application_id,"Rejected")
}
>

Reject

</button>

</td>

</tr>

))}

</tbody>

</table>

</div>

)}

            </div>

        </>

    );

}

export default EmployerDashboard;