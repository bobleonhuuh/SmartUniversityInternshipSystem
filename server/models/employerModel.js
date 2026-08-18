const db = require("../config/db");


// Get internships posted by employer
const getEmployerInternships = (employerId, callback) => {

    const sql = `
        SELECT *
        FROM internships
        WHERE employer_id = ?
        ORDER BY created_at DESC
    `;

    db.query(sql, [employerId], callback);

};


// Get applications for employer internship
const getInternshipApplications = (internshipId, callback) => {

    const sql = `
        SELECT

            a.application_id,
            a.application_date,
            a.status,
            a.cover_letter,

            s.student_id,
            s.first_name,
            s.last_name,
            s.course,
            s.department,
            s.year_of_study,
            s.cgpa,
            s.skills,
            s.cv

        FROM applications a

        INNER JOIN students s
            ON a.student_id = s.student_id

        WHERE a.internship_id = ?

        ORDER BY a.application_date DESC
    `;


    db.query(sql, [internshipId], callback);

};

const getEmployerByUserId = (userId, callback) => {

    const sql = `
        SELECT employer_id
        FROM employers
        WHERE user_id = ?
        LIMIT 1
    `;

    db.query(sql, [userId], callback);

};

module.exports = {
    getEmployerInternships,
    getInternshipApplications,
    getEmployerByUserId
};