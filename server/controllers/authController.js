const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");
const Student = require("../models/studentModel");


// ======================================
// REGISTER USER
// ======================================
exports.register = async (req, res) => {

    try {

        const {
            full_name,
            email,
            password,
            role
        } = req.body;


        // ===============================
        // VALIDATE INPUT
        // ===============================

        if (!full_name || !email || !password || !role) {

            return res.status(400).json({
                success: false,
                message: "Please fill in all required fields."
            });

        }


        // ===============================
        // HASH PASSWORD
        // ===============================

        const hashedPassword = await bcrypt.hash(
            password,
            10
        );


        // ===============================
        // CREATE USER
        // ===============================

        User.createUser(
            {
                full_name,
                email,
                password: hashedPassword,
                role
            },

            (err, result) => {

                if (err) {

                    // Duplicate email
                    if (err.code === "ER_DUP_ENTRY") {

                        return res.status(400).json({
                            success: false,
                            message:
                                "An account with this email already exists."
                        });

                    }


                    console.error(
                        "USER CREATION ERROR:",
                        err
                    );

                    return res.status(500).json({
                        success: false,
                        message: "Registration failed.",
                        error: err.message
                    });

                }


                // ===============================
                // GET NEW USER ID
                // ===============================

                const userId = result.insertId;


                // ===============================
                // CREATE STUDENT PROFILE
                // ===============================

                if (
                    String(role).toLowerCase() === "student"
                ) {

                    const nameParts =
                        full_name.trim().split(/\s+/);


                    const firstName =
                        nameParts[0] || "";


                    const lastName =
                        nameParts
                            .slice(1)
                            .join(" ") || "";


                    Student.createStudent(
                        {

                            user_id: userId,

                            registration_number: "",

                            first_name: firstName,

                            last_name: lastName,

                            gender: "",

                            date_of_birth: null,

                            phone: "",

                            course: "",

                            department: "",

                            year_of_study: 1,

                            cgpa: 0,

                            skills: "",

                            cv: null,

                            profile_picture: null,

                            bio: "",

                            profile_completed: 0

                        },

                        (studentErr, studentResult) => {

                            if (studentErr) {

                                console.error(
                                    "STUDENT CREATION ERROR:",
                                    studentErr
                                );


                                return res.status(500).json({

                                    success: false,

                                    message:
                                        "User was created, but the student profile could not be created.",

                                    error:
                                        studentErr.message,

                                    userId

                                });

                            }


                            console.log(
                                "Student profile created successfully."
                            );

                            console.log(
                                "User ID:",
                                userId
                            );

                            console.log(
                                "Student ID:",
                                studentResult.insertId
                            );


                            return res.status(201).json({

                                success: true,

                                message:
                                    "Registration Successful",

                                userId: userId,

                                studentId:
                                    studentResult.insertId

                            });

                        }
                    );


                } else {

                    // ===============================
                    // NON-STUDENT REGISTRATION
                    // ===============================

                    return res.status(201).json({

                        success: true,

                        message:
                            "Registration Successful",

                        userId: userId

                    });

                }

            }
        );


    } catch (error) {

        console.error(
            "REGISTRATION ERROR:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Something went wrong.",

            error:
                error.message

        });

    }

};



// ======================================
// LOGIN USER
// ======================================
exports.login = (req, res) => {

    const {
        email,
        password
    } = req.body;


    // ===============================
    // VALIDATE LOGIN
    // ===============================

    if (!email || !password) {

        return res.status(400).json({

            success: false,

            message:
                "Email and password are required."

        });

    }


    // ===============================
    // FIND USER
    // ===============================

    User.findUserByEmail(
        email,

        async (err, results) => {

            if (err) {

                console.error(
                    "LOGIN DATABASE ERROR:",
                    err
                );

                return res.status(500).json({

                    success: false,

                    message:
                        "Database Error"

                });

            }


            // ===============================
            // USER NOT FOUND
            // ===============================

            if (
                !results ||
                results.length === 0
            ) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Email not found"

                });

            }


            const user = results[0];


            // ===============================
            // CHECK PASSWORD
            // ===============================

            try {

                const match =
                    await bcrypt.compare(
                        password,
                        user.password
                    );


                if (!match) {

                    return res.status(401).json({

                        success: false,

                        message:
                            "Incorrect password"

                    });

                }

            } catch (passwordError) {

                console.error(
                    "PASSWORD CHECK ERROR:",
                    passwordError
                );

                return res.status(500).json({

                    success: false,

                    message:
                        "Unable to verify password."

                });

            }


            // ===============================
            // CREATE JWT
            // ===============================

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


            // ===============================
            // LOGIN SUCCESS
            // ===============================

            return res.status(200).json({

                success: true,

                message:
                    "Login Successful",

                token,

                user: {

                    id: user.id,

                    full_name:
                        user.full_name,

                    email:
                        user.email,

                    role:
                        user.role

                }

            });

        }
    );

};
