const db = require("../config/db");



// ======================================
// CREATE STUDENT PROFILE
// ======================================
const createStudent = (student, callback) => {

    const sql = `

        INSERT INTO students
        (
            user_id,
            registration_number,
            first_name,
            last_name,
            gender,
            date_of_birth,
            phone,
            course,
            department,
            year_of_study,
            cgpa,
            skills,
            cv,
            profile_picture,
            bio,
            profile_completed
        )

        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)

    `;


    db.query(

        sql,

        [

            student.user_id,

            student.registration_number,

            student.first_name,

            student.last_name,

            student.gender,

            student.date_of_birth,

            student.phone,

            student.course,

            student.department,

            student.year_of_study,

            student.cgpa,

            student.skills,

            student.cv,

            student.profile_picture,

            student.bio,

            student.profile_completed

        ],

        callback

    );

};



// ======================================
// GET STUDENT PROFILE
// ======================================
const getStudentProfile = (userId, callback) => {

    const sql = `

        SELECT
            student_id,
            user_id,
            registration_number,
            first_name,
            last_name,
            gender,
            date_of_birth,
            phone,
            course,
            department,
            year_of_study,
            cgpa,
            skills,
            cv,
            profile_picture,
            bio,
            profile_completed

        FROM students

        WHERE user_id = ?

        LIMIT 1

    `;


    db.query(

        sql,

        [userId],

        callback

    );

};



// ======================================
// UPDATE STUDENT PROFILE
// ======================================
const updateStudentProfile = (
    userId,
    student,
    callback
) => {

    const sql = `

        UPDATE students

        SET

            first_name = ?,

            last_name = ?,

            gender = ?,

            date_of_birth = ?,

            phone = ?,

            course = ?,

            department = ?,

            year_of_study = ?,

            cgpa = ?,

            skills = ?,

            bio = ?,

            profile_completed = 1

        WHERE user_id = ?

    `;


    db.query(

        sql,

        [

            student.first_name,

            student.last_name,

            student.gender,

            student.date_of_birth,

            student.phone,

            student.course,

            student.department,

            student.year_of_study,

            student.cgpa,

            student.skills,

            student.bio,

            userId

        ],

        callback

    );

};



// ======================================
// GET STUDENT APPLICATIONS
// ======================================
const getMyApplications = (
    userId,
    callback
) => {

    const sql = `

        SELECT

            a.application_id,

            a.application_date,

            a.status,

            a.cover_letter,

            i.internship_id,

            i.title,

            i.description,

            i.location,

            i.category,

            i.duration,

            i.stipend,

            i.deadline

        FROM applications a

        INNER JOIN students s

            ON a.student_id = s.student_id

        INNER JOIN internships i

            ON a.internship_id =
               i.internship_id

        WHERE s.user_id = ?

        ORDER BY
            a.application_date DESC

    `;


    db.query(

        sql,

        [userId],

        callback

    );

};



// ======================================
// GET ALL STUDENTS
// ======================================
const getAllStudents = (callback) => {

    const sql = `

        SELECT *

        FROM students

        ORDER BY student_id ASC

    `;


    db.query(

        sql,

        callback

    );

};



// ======================================
// GET STUDENT ID FROM USER ID
// ======================================
const getStudentIdByUserId = (
    userId,
    callback
) => {

    const sql = `

        SELECT student_id

        FROM students

        WHERE user_id = ?

        LIMIT 1

    `;


    db.query(

        sql,

        [userId],

        callback

    );

};



// ======================================
// EXPORT FUNCTIONS
// ======================================
module.exports = {

    createStudent,

    getStudentProfile,

    updateStudentProfile,

    getMyApplications,

    getAllStudents,

    getStudentIdByUserId

};