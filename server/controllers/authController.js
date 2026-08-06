const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");
const Student = require("../models/studentModel");


// REGISTER USER

exports.register = async (req, res) => {

    try {

        const { full_name, email, password, role } = req.body;

        // Validate input
        if (!full_name || !email || !password || !role) {

            return res.status(400).json({
                success: false,
                message: "Please fill in all required fields."
            });

        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        User.createUser({

            full_name,
            email,
            password: hashedPassword,
            role

        }, (err, result) => {

            if (err) {

                if (err.code === "ER_DUP_ENTRY") {

                    return res.status(400).json({
                        success: false,
                        message: "An account with this email already exists."
                    });

                }

                console.error(err);

                return res.status(500).json({
                    success: false,
                    message: "Registration failed.",
                    error: err.message
                });

            }

            const userId = result.insertId;

            // Automatically create student profile
            if (role === "student") {

                Student.createStudent({

                    user_id: userId,
                    registration_number: "",
                    first_name: full_name.split(" ")[0] || "",
                    last_name: full_name.split(" ").slice(1).join(" ") || "",
                    gender: "",
                    date_of_birth: null,
                    phone: "",
                    course: "",
                    department: "",
                    year_of_study: "",
                    gpa: 0,
                    skills: "",
                    cv: null,
                    profile_picture: null

                }, (studentErr) => {

                    if (studentErr) {

                        console.error("Student Profile Error:", studentErr);

                    }

                });

            }

            return res.status(201).json({

                success: true,
                message: "Registration Successful",
                userId

            });

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,
            message: "Something went wrong.",
            error: error.message

        });

    }

};


// ======================================
// LOGIN USER
// ======================================
exports.login = (req, res) => {

    const { email, password } = req.body;

    User.findUserByEmail(email, async (err, results) => {

        if (err) {

            console.error(err);

            return res.status(500).json({
                success: false,
                message: "Database Error"
            });

        }

        if (!results || results.length === 0) {

            return res.status(404).json({
                success: false,
                message: "Email not found"
            });

        }

        const user = results[0];

        const match = await bcrypt.compare(password, user.password);

        if (!match) {

            return res.status(401).json({
                success: false,
                message: "Incorrect password"
            });

        }

        const token = jwt.sign(

            {
                id: user.id,
                role: user.role
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "1d"
            }

        );

        return res.status(200).json({

            success: true,
            message: "Login Successful",

            token,

            user: {

                id: user.id,
                full_name: user.full_name,
                email: user.email,
                role: user.role

            }

        });

    });

};