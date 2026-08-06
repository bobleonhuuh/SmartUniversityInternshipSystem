import { Link, useLocation } from "react-router-dom";

const LINKS_BY_ROLE = {
    student: [
        { to: "/student", label: "Overview" },
        { to: "/internships", label: "Browse Internships" },
        { to: "/profile", label: "My Profile" }
    ],
    employer: [
        { to: "/employer", label: "Overview" },
        { to: "/internships", label: "Browse Internships" }
    ],
    coordinator: [
        { to: "/coordinator", label: "Overview" },
        { to: "/internships", label: "Browse Internships" }
    ],
    admin: [
        { to: "/admin", label: "Overview" },
        { to: "/internships", label: "Browse Internships" }
    ]
};

function Sidebar({ role }) {
    const location = useLocation();
    const links = LINKS_BY_ROLE[role] || [];

    return (
        <aside className="sidebar bg-white border-end p-3" style={{ minWidth: "220px" }}>
            <h6 className="text-uppercase text-muted mb-3 px-2">
                {role} Menu
            </h6>

            <ul className="nav nav-pills flex-column gap-1">
                {links.map((link) => (
                    <li className="nav-item" key={link.to}>
                        <Link
                            to={link.to}
                            className={`nav-link ${location.pathname === link.to ? "active" : "text-dark"}`}
                        >
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </aside>
    );
}

export default Sidebar;
