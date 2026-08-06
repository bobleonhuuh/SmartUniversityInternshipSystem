function Internship({ internship, onApply, applyDisabled, applyLabel, matchScore }) {
    const {
        title,
        company_name,
        location,
        description,
        stipend,
        duration,
        deadline,
        status
    } = internship;

    return (
        <div className="card dashboard-card p-4 mb-3">
            <div className="d-flex justify-content-between align-items-start">
                <div>
                    <h5 className="fw-bold mb-1">{title}</h5>
                    <p className="text-muted mb-1">{company_name}</p>
                    {location && <p className="mb-1 small">📍 {location}</p>}
                </div>

                <div className="d-flex flex-column align-items-end gap-1">
                    {typeof matchScore === "number" && (
                        <span className="badge badge-primary-soft">Match {matchScore}%</span>
                    )}
                    {status && (
                        <span className={`badge ${status === "Open" ? "badge-success-soft" : "badge-danger-soft"}`}>
                            {status}
                        </span>
                    )}
                </div>
            </div>

            {description && (
                <p className="mt-2 mb-2">{description}</p>
            )}

            <div className="d-flex flex-wrap gap-3 small text-muted mb-3">
                {stipend && <span>💰 KES {Number(stipend).toLocaleString()}</span>}
                {duration && <span>⏱ {duration}</span>}
                {deadline && (
                    <span>
                        🗓 Deadline: {new Date(deadline).toLocaleDateString()}
                    </span>
                )}
            </div>

            {onApply && (
                <button
                    className="btn btn-primary align-self-start"
                    onClick={() => onApply(internship)}
                    disabled={applyDisabled}
                >
                    {applyLabel || "Apply Now"}
                </button>
            )}
        </div>
    );
}

export default Internship;
