import { Navigate } from "react-router-dom";

// Guards a route so only logged-in users of the right role can see it.
// If allowedRoles is omitted, any logged-in user is allowed through.
function ProtectedRoute({ children, allowedRoles }) {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "null");

    if (!token || !user) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default ProtectedRoute;
