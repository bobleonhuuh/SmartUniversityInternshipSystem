import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../services/api";

function Profile() {

    const user = JSON.parse(
        localStorage.getItem("user") || "null"
    );

    // Support either id or user_id from login response
    const userId = user?.id || user?.user_id;

    console.log("Logged in user:", user);
    console.log("Using user ID:", userId);

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
        cgpa: "",
        skills: "",
        bio: ""
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {

        if (!userId) {

            setError(
                "Your login information is missing. Please logout and login again."
            );

            setLoading(false);

            return;
        }

        const loadProfile = async () => {

            try {

                console.log(
                    "GET student profile:",
                    `/students/${userId}`
                );

                const response = await api.get(
                    `/students/${userId}`
                );

                console.log(
                    "Profile response:",
                    response.data
                );

                if (response.data?.student) {

                    setStudent(response.data.student);

                } else {

                    setError(
                        "Student profile not found."
                    );

                }

            } catch (err) {

                console.error(
                    "GET PROFILE ERROR:",
                    err.response?.data || err
                );

                setError(
                    err.response?.data?.message ||
                    "Student profile not found."
                );

            } finally {

                setLoading(false);

            }

        };

        loadProfile();

    }, [userId]);


    const handleChange = (e) => {

        setStudent({
            ...student,
            [e.target.name]: e.target.value
        });

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!userId) {

            setError(
                "User ID is missing. Please login again."
            );

            return;
        }

        try {

            setSaving(true);
            setError("");
            setMessage("");

            console.log(
                "PUT student profile:",
                `/students/${userId}`
            );

            const response = await api.put(
                `/students/${userId}`,
                student
            );

            console.log(
                "UPDATE RESPONSE:",
                response.data
            );

            setMessage(
                "Student profile updated successfully!"
            );

        } catch (err) {

            console.error(
                "UPDATE PROFILE ERROR:",
                err.response?.data || err
            );

            setError(
                err.response?.data?.message ||
                "Unable to update student profile."
            );

        } finally {

            setSaving(false);

        }

    };


    if (loading) {

        return (
            <>
                <Navbar />

                <div className="container my-5 text-center">

                    <div
                        className="spinner-border text-primary"
                        role="status"
                    />

                    <p className="mt-3">
                        Loading student profile...
                    </p>

                </div>

                <Footer />
            </>
        );

    }


    return (
        <>
            <Navbar />

            <div className="container my-5">

                <div className="card shadow-sm p-4">

                    <h2>My Profile</h2>

                    <p className="text-muted">
                        Update your student information.
                    </p>


                    {message && (
                        <div className="alert alert-success">
                            {message}
                        </div>
                    )}


                    {error && (
                        <div className="alert alert-danger">
                            {error}
                        </div>
                    )}


                    <form onSubmit={handleSubmit}>

                        <div className="row">

                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    First Name
                                </label>

                                <input
                                    className="form-control"
                                    name="first_name"
                                    value={student.first_name || ""}
                                    onChange={handleChange}
                                />

                            </div>


                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    Last Name
                                </label>

                                <input
                                    className="form-control"
                                    name="last_name"
                                    value={student.last_name || ""}
                                    onChange={handleChange}
                                />

                            </div>


                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    Registration Number
                                </label>

                                <input
                                    className="form-control"
                                    value={
                                        student.registration_number || ""
                                    }
                                    disabled
                                />

                            </div>


                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    Gender
                                </label>

                                <input
                                    className="form-control"
                                    name="gender"
                                    value={student.gender || ""}
                                    onChange={handleChange}
                                />

                            </div>


                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    Phone
                                </label>

                                <input
                                    className="form-control"
                                    name="phone"
                                    value={student.phone || ""}
                                    onChange={handleChange}
                                />

                            </div>


                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    Date of Birth
                                </label>

                                <input
                                    className="form-control"
                                    type="date"
                                    name="date_of_birth"
                                    value={
                                        student.date_of_birth
                                            ? String(
                                                student.date_of_birth
                                            ).substring(0, 10)
                                            : ""
                                    }
                                    onChange={handleChange}
                                />

                            </div>


                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    Course
                                </label>

                                <input
                                    className="form-control"
                                    name="course"
                                    value={student.course || ""}
                                    onChange={handleChange}
                                />

                            </div>


                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    Department
                                </label>

                                <input
                                    className="form-control"
                                    name="department"
                                    value={student.department || ""}
                                    onChange={handleChange}
                                />

                            </div>


                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    Year of Study
                                </label>

                                <input
                                    className="form-control"
                                    type="number"
                                    name="year_of_study"
                                    value={student.year_of_study || ""}
                                    onChange={handleChange}
                                />

                            </div>


                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    CGPA
                                </label>

                                <input
                                    className="form-control"
                                    type="number"
                                    step="0.01"
                                    name="cgpa"
                                    value={student.cgpa || ""}
                                    onChange={handleChange}
                                />

                            </div>


                            <div className="col-12 mb-3">

                                <label className="form-label">
                                    Skills
                                </label>

                                <textarea
                                    className="form-control"
                                    rows="3"
                                    name="skills"
                                    value={student.skills || ""}
                                    onChange={handleChange}
                                />

                            </div>


                            <div className="col-12 mb-3">

                                <label className="form-label">
                                    Bio
                                </label>

                                <textarea
                                    className="form-control"
                                    rows="3"
                                    name="bio"
                                    value={student.bio || ""}
                                    onChange={handleChange}
                                />

                            </div>

                        </div>


                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={saving}
                        >

                            {saving
                                ? "Saving..."
                                : "Save Profile"}

                        </button>

                    </form>

                </div>

            </div>

            <Footer />
        </>
    );
}

export default Profile;
