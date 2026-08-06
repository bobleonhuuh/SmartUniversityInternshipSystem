import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const FEATURES = [
    {
        icon: "🎯",
        title: "Smart Matching",
        text: "AI-powered matching based on your skills, interests, and goals."
    },
    {
        icon: "📈",
        title: "Career Readiness",
        text: "Track your readiness score and get personalized improvement tips."
    },
    {
        icon: "🏢",
        title: "Real Opportunities",
        text: "Access verified internships from top companies."
    },
    {
        icon: "📊",
        title: "Progress Tracking",
        text: "Track your applications and internship progress in real time."
    }
];

const STATS = [
    { value: "5,000+", label: "Students" },
    { value: "500+", label: "Employers" },
    { value: "2,000+", label: "Internships" },
    { value: "98%", label: "Satisfaction Rate" }
];

function Home() {
    return (
        <>
            <Navbar />

            {/* Hero */}
            <section className="hero-section py-5">
                <div className="container py-4">
                    <div className="row align-items-center g-5">
                        <div className="col-lg-6">
                            <h1 className="fw-bold" style={{ fontSize: "2.75rem", color: "var(--navy)" }}>
                                Your Journey From Classroom to Career Starts Here
                            </h1>
                            <p className="lead text-muted mt-3">
                                Smart matching. Real opportunities. Endless possibilities.
                                We help students discover internship opportunities that fit
                                their skills and goals.
                            </p>
                            <div className="d-flex gap-3 mt-4">
                                <Link to="/register" className="btn btn-primary btn-lg px-4">
                                    Get Started
                                </Link>
                                <Link to="/internships" className="btn btn-outline-primary btn-lg px-4">
                                    How It Works
                                </Link>
                            </div>
                        </div>

                        <div className="col-lg-6 text-center">
                            <img
                                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=700"
                                className="img-fluid rounded-4 shadow"
                                alt="Students collaborating"
                            />
                        </div>
                    </div>

                    {/* Stats strip */}
                    <div className="stat-strip row g-0 mt-5 py-4 px-3 text-center">
                        {STATS.map((s) => (
                            <div className="col-6 col-md-3" key={s.label}>
                                <h3 className="fw-bold mb-0" style={{ color: "var(--navy)" }}>{s.value}</h3>
                                <p className="text-muted small mb-0">{s.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-5">
                <div className="container">
                    <h2 className="text-center fw-bold" style={{ color: "var(--navy)" }}>
                        Why Students Love CareerBridge
                    </h2>
                    <p className="text-center text-muted mb-5">
                        Everything you need to kickstart your career
                    </p>

                    <div className="row g-4">
                        {FEATURES.map((f) => (
                            <div className="col-md-6 col-lg-3" key={f.title}>
                                <div className="card dashboard-card p-4 h-100">
                                    <div className="feature-icon mb-3">{f.icon}</div>
                                    <h6 className="fw-bold">{f.title}</h6>
                                    <p className="text-muted small mb-0">{f.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonial */}
            <section className="navy-section py-5">
                <div className="container text-center">
                    <p className="fs-4 fst-italic mb-3" style={{ maxWidth: "700px", margin: "0 auto" }}>
                        &ldquo;This platform helped me find an internship that matched my skills
                        and passion.&rdquo;
                    </p>
                    <p className="fw-bold mb-0">— Brian Otieno, Software Engineering Student</p>
                </div>
            </section>

            <Footer />
        </>
    );
}

export default Home;
