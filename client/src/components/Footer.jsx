function Footer() {
    return (
        <footer className="site-footer py-5 mt-auto">
            <div className="container">
                <div className="row g-4">
                    <div className="col-md-4">
                        <h6 className="text-white fw-bold mb-3">Our Mission</h6>
                        <p className="small mb-0">
                            To bridge the gap between education and employment by
                            empowering students, supporting employers, and partnering
                            with universities for a better future.
                        </p>
                    </div>

                    <div className="col-md-4">
                        <h6 className="text-white fw-bold mb-3">Quick Links</h6>
                        <p className="small mb-1">About Us</p>
                        <p className="small mb-1">Contact Us</p>
                        <p className="small mb-1">Privacy Policy</p>
                        <p className="small mb-0">Terms of Service</p>
                    </div>

                    <div className="col-md-4">
                        <h6 className="text-white fw-bold mb-3">Contact</h6>
                        <p className="small mb-1">Email: support@careerbridge.ac.ke</p>
                        <p className="small mb-1">Phone: +254 700 123 456</p>
                        <p className="small mb-0">Nairobi, Kenya</p>
                    </div>
                </div>

                <hr className="border-secondary mt-4 mb-3 opacity-25" />

                <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
                    <p className="mb-0 small">
                        &copy; {new Date().getFullYear()} CareerBridge. All rights reserved.
                    </p>
                    <p className="mb-0 small fst-italic">
                        &ldquo;Opportunities don't happen. You create them.&rdquo;
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
