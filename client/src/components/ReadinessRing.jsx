// Circular progress ring used for "Career Readiness Score" and match %,
// rendered as inline SVG so it needs no chart library.
function ReadinessRing({ score, size = 110, label, sublabel }) {
    const stroke = 10;
    const radius = (size - stroke) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;

    const color = score >= 80 ? "#198754" : score >= 50 ? "#0d6efd" : "#997404";

    return (
        <div className="d-flex flex-column align-items-center">
            <svg width={size} height={size}>
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke="#e9eaf3"
                    strokeWidth={stroke}
                />
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke={color}
                    strokeWidth={stroke}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    transform={`rotate(-90 ${size / 2} ${size / 2})`}
                    style={{ transition: "stroke-dashoffset 0.6s ease" }}
                />
                <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={size * 0.24}
                    fontWeight="700"
                    fill="#1c2136"
                >
                    {score}%
                </text>
            </svg>
            {label && <p className="fw-bold mb-0 mt-2 text-center">{label}</p>}
            {sublabel && <p className="text-muted small text-center mb-0">{sublabel}</p>}
        </div>
    );
}

export default ReadinessRing;
