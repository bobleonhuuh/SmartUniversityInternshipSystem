import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../services/api";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const response = await api.post("/auth/login", { email, password });

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));

            const dashboardByRole = {
                student: "/student",
                employer: "/employer",
                coordinator: "/coordinator",
                admin: "/admin"
            };

            const role = String(response.data.user.role || "").toLowerCase().trim();
            window.location.href = dashboardByRole[role] || "/";
        } catch (error) {
            alert(error.response?.data?.message || "Login failed");
            setSubmitting(false);
        }
    };

    return (
        <>
            <Navbar />

            <div className="container my-5" style={{ maxWidth: "440px" }}>
                <div className="card p-4">
                    <h2 className="mb-1">Welcome Back</h2>
                    <p className="text-muted mb-4">Login to your account.</p>

                    <form onSubmit={handleLogin}>
                        <div className="mb-3">
                            <label className="form-label small text-muted">Email</label>
                            <input
                                className="form-control"
                                type="email"
                                placeholder="you@university.ac.ke"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="form-label small text-muted">Password</label>
                            <input
                                className="form-control"
                                type="password"
                                placeholder="Your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button className="btn btn-primary w-100" type="submit" disabled={submitting}>
                            {submitting ? "Logging in..." : "Login"}
                        </button>
                    </form>

                    <p className="text-center text-muted small mt-4 mb-0">
                        Don't have an account? <Link to="/register">Sign up</Link>
                    </p>
                </div>
            </div>

            <Footer />
        </>
    );
}

export default Login;
