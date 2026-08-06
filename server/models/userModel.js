const db = require("../config/db");

const createUser = (user, callback) => {
    const sql = `
        INSERT INTO users(full_name,email,password,role)
        VALUES(?,?,?,?)
    `;

    db.query(
        sql,
        [user.full_name, user.email, user.password, user.role],
        callback
    );
};

const findUserByEmail = (email, callback) => {
    db.query(
        "SELECT * FROM users WHERE email=?",
        [email],
        callback
    );
};

module.exports = {
    createUser,
    findUserByEmail
};