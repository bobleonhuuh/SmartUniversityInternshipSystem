const db = require("../config/db");

// ===================================
// GET ALL INTERNSHIPS
// ===================================

const getAllInternships = (callback) => {

    const sql = "SELECT * FROM internships ORDER BY created_at DESC";

    db.query(sql, callback);

};


// ===================================
// GET SINGLE INTERNSHIP
// ===================================

const getInternshipById = (id, callback) => {

    const sql = "SELECT * FROM internships WHERE internship_id=?";

    db.query(sql, [id], callback);

};


// ===================================
// CREATE INTERNSHIP
// ===================================

const createInternship = (internship, callback) => {

    const sql = `
        INSERT INTO internships (
            employer_id,
            title,
            description,
            location,
            category,
            required_skills,
            stipend,
            duration,
            deadline,
            status
        )
        VALUES (?,?,?,?,?,?,?,?,?,?)
    `;

    db.query(sql, [

        internship.employer_id,
        internship.title,
        internship.description,
        internship.location,
        internship.category,
        internship.required_skills,
        internship.stipend,
        internship.duration,
        internship.deadline,
        "Open"

    ], callback);

};


// ===================================
// DELETE INTERNSHIP
// ===================================

const deleteInternship=(id,callback)=>{

    db.query(

        "DELETE FROM internships WHERE internship_id=?",

        [id],

        callback

    );

};


module.exports={

    getAllInternships,

    getInternshipById,

    createInternship,

    deleteInternship

};