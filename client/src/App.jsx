import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/StudentDashboard";
import CoordinatorDashboard from "./pages/CoordinatorDashboard";
import Profile from "./pages/Profile";
import Internship from "./pages/Internship";
import MyApplication from "./pages/MyApplication";
import EmployerDashboard from "./pages/EmployerDashboard";
import PostInternship from "./pages/PostInternship";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Applicants from "./pages/Applicants";
function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />
              
                <Route
                     path="/student"
                     element={<StudentDashboard />}
                />
                <Route
                     path="/coordinator"
                     element={<CoordinatorDashboard />}
                />
                <Route
                     path="/profile"
                     element={<Profile />}
                />
                <Route
                    path="/internships"
                    element={<Internship />}
                />
                <Route
                    path="/applications"
                    element={<MyApplication />}
                />
                <Route
                    path="/employer"
                    element={<EmployerDashboard />}
                />
                <Route
                    path="/post-internship"
                    element={<PostInternship />}
                />
                <Route
                    path="/admin"
                    element={<AdminDashboard />}
                />
                <Route
                    path="*"
                    element={<Home />}
                />
                <Route
                    path="/applicants/:internshipId"
                    element={<Applicants />}
                />
                <Route
                    path="/student"
                    element={<ProtectedRoute allowedRoles={["student"]}> <StudentDashboard /> </ProtectedRoute>}
                />
                <Route
                    path="/student"
                    element={<ProtectedRoute allowedRoles={["student"]}> <StudentDashboard /> </ProtectedRoute>}
                />
                <Route
                    path="/coordinator"
                    element={<ProtectedRoute allowedRoles={["coordinator"]}> <CoordinatorDashboard /> </ProtectedRoute>}
                />
                <Route
                    path="/employer"
                    element={<ProtectedRoute allowedRoles={["employer"]}> <EmployerDashboard /> </ProtectedRoute>}
                />
                <Route
                    path="/admin"
                    element={<ProtectedRoute allowedRoles={["admin"]}> <AdminDashboard /> </ProtectedRoute>}
                />

            </Routes>

        </BrowserRouter>

    );

}

export default App;