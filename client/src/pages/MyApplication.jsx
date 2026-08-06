import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

function MyApplications() {

    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    const [applications, setApplications] = useState([]);

    useEffect(() => {
        if (!user) {
            navigate("/login");
            return;
        }

        axios.get(`http://localhost:5001/api/applications/student/${user.id}`)
            .then(res => {
                setApplications(res.data);
            })
            .catch(() => {
                setApplications([]);
            });
    }, [navigate, user]);

    if (!user) {
        return null;
    }

    return (

        <>
            <Navbar />

            <div className="container mt-5">

                <h2>My Applications</h2>

                <table className="table table-bordered">

                    <thead>

                        <tr>

                            <th>Internship</th>
                            <th>Location</th>
                            <th>Status</th>
                            <th>Date</th>

                        </tr>

                    </thead>

                    <tbody>

                        {applications.map(app => (

                            <tr key={app.application_id}>

                                <td>{app.title}</td>
                                <td>{app.location}</td>
                                <td>{app.status}</td>
                                <td>{app.application_date}</td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </>

    );

}

export default MyApplications;