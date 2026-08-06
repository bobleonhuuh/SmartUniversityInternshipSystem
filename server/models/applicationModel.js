const db = require("../config/db");

// ===============================
// Apply for Internship
// ===============================
const apply = (application, callback) => {
    const sql = `
        INSERT INTO applications (
            internship_id,
            student_id,
            cover_letter,
            status
        )
        VALUES (?, ?, ?, ?)
    `;
    db.query(sql, [
        application.internship_id,
        application.student_id,
        application.cover_letter,
        "Pending"
    ], callback);
};

// ===============================
// Student Applications
// ===============================
const getStudentApplications = (studentId, callback) => {
    const sql = `
        SELECT
            a.application_id,
            i.title,
            i.location,
            a.status,
            a.application_date
        FROM applications a
        JOIN internships i
            ON a.internship_id = i.internship_id
        WHERE a.student_id = ?
        ORDER BY a.application_date DESC
    `;
    db.query(sql, [studentId], callback);
};

// ===============================
// Employer Views Applicants
// ===============================
const getApplicants = (internshipId, callback) => {
    const sql = `
        SELECT
            a.application_id,
            s.first_name,
            s.last_name,
            s.registration_number,
            s.course,
            a.cover_letter,
            a.status
        FROM applications a
        JOIN students s
            ON a.student_id = s.student_id
        WHERE a.internship_id = ?
    `;
    db.query(sql, [internshipId], callback);
};

// ===================================
// Get All Applications (Admin)
// ===================================
const getAllApplications = (callback) => {
    const sql = `
        SELECT
            a.application_id,
            i.title,
            s.first_name,
            s.last_name,
            a.status,
            a.application_date
        FROM applications a
        JOIN internships i
            ON a.internship_id = i.internship_id
        JOIN students s
            ON a.student_id = s.student_id
        ORDER BY a.application_date DESC
    `;
    db.query(sql, callback);
};

// ===================================
// Update Status
// ===================================
const updateApplicationStatus = (applicationId, status, callback) => {
    const sql = `
        UPDATE applications
        SET status=?
        WHERE application_id=?
    `;
    db.query(sql, [status, applicationId], callback);
};

module.exports = {
    apply,
    getStudentApplications,
    getApplicants,
    getAllApplications,
    updateApplicationStatus
};