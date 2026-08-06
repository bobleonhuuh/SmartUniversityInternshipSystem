import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../services/api";

function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        full_name: "",
        email: "",
        password: "",
        role: "student",
        first_name: "",
        last_name: "",
        registration_number: "",
        company_name: ""
    });
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const response = await api.post("/auth/register", formData);
            alert(response.data.message);
            navigate("/login");
        } catch (error) {
            alert(error.response?.data?.message || "Registration failed");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <Navbar />

            <div className="container my-5" style={{ maxWidth: "480px" }}>
                <div className="card p-4">
                    <h2 className="mb-1">Create Your Account</h2>
                    <p className="text-muted mb-4">Join CareerBridge and start your journey.</p>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label small text-muted">Full Name</label>
                            <input
                                className="form-control"
                                name="full_name"
                                placeholder="Enter your full name"
                                value={formData.full_name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label small text-muted">Email</label>
                            <input
                                className="form-control"
                                name="email"
                                type="email"
                                placeholder="you@university.ac.ke"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label small text-muted">Password</label>
                            <input
                                className="form-control"
                                name="password"
                                type="password"
                                placeholder="Choose a password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                minLength={6}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label small text-muted">I am a...</label>
                            <select
                                className="form-select"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                            >
                                <option value="student">Student</option>
                                <option value="employer">Employer</option>
                                <option value="coordinator">Coordinator</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>

                        {formData.role === "student" && (
                            <>
                                <div className="row g-2 mb-3">
                                    <div className="col-6">
                                        <input
                                            className="form-control"
                                            name="first_name"
                                            placeholder="First Name"
                                            value={formData.first_name}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-6">
                                        <input
                                            className="form-control"
                                            name="last_name"
                                            placeholder="Last Name"
                                            value={formData.last_name}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <input
                                        className="form-control"
                                        name="registration_number"
                                        placeholder="Registration Number (optional)"
                                        value={formData.registration_number}
                                        onChange={handleChange}
                                    />
                                </div>
                            </>
                        )}

                        {formData.role === "employer" && (
                            <div className="mb-4">
                                <input
                                    className="form-control"
                                    name="company_name"
                                    placeholder="Company Name"
                                    value={formData.company_name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}

                        <button className="btn btn-primary w-100" type="submit" disabled={submitting}>
                            {submitting ? "Creating account..." : "Create Account"}
                        </button>
                    </form>

                    <p className="text-center text-muted small mt-4 mb-0">
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
                </div>
            </div>

            <Footer />
        </>
    );
}

export default Register;
