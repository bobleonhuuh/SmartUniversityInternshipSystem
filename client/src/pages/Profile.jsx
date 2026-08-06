import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Profile() {

    const user = JSON.parse(localStorage.getItem("user"));

    const [student, setStudent] = useState({
        first_name: "",
        last_name: "",
        registration_number: "",
        gender: "",
        date_of_birth: "",
        phone: "",
        course: "",
        department: "",
        year_of_study: "",
        gpa: "",
        skills: ""
    });

    useEffect(() => {

        axios.get(`http://localhost:5001/api/students/${user.id}`)
            .then((res) => {
                setStudent(res.data);
            })
            .catch((err) => {
                console.log(err);
            });

    }, []);

    const handleChange = (e) => {

        setStudent({
            ...student,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await axios.put(
                "http://localhost:5001/api/students/update",
                student
            );

            alert("Profile updated successfully!");

        } catch (err) {

            alert("Unable to update profile.");

        }

    };

    return (
        <>
            <Navbar />

            <div className="container mt-5">

                <h2>My Profile</h2>

                <form onSubmit={handleSubmit}>

                    <input
                        className="form-control mb-3"
                        placeholder="First Name"
                        name="first_name"
                        value={student.first_name}
                        onChange={handleChange}
                    />

                    <input
                        className="form-control mb-3"
                        placeholder="Last Name"
                        name="last_name"
                        value={student.last_name}
                        onChange={handleChange}
                    />

                    <input
                        className="form-control mb-3"
                        placeholder="Phone"
                        name="phone"
                        value={student.phone}
                        onChange={handleChange}
                    />

                    <input
                        className="form-control mb-3"
                        placeholder="Course"
                        name="course"
                        value={student.course}
                        onChange={handleChange}
                    />

                    <input
                        className="form-control mb-3"
                        placeholder="Department"
                        name="department"
                        value={student.department}
                        onChange={handleChange}
                    />

                    <button className="btn btn-primary">
                        Save Profile
                    </button>

                </form>

            </div>

        </>
    );

}

export default Profile;