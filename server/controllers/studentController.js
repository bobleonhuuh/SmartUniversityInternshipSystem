const Student = require("../models/studentModel");


// ===============================
// GET STUDENT PROFILE
// ===============================
exports.getStudentProfile = (req, res) => {

    const userId = req.params.userId;

    Student.getStudentProfile(userId, (err, results) => {

        if (err) {
            console.error(err);

            return res.status(500).json({
                success: false,
                message: "Unable to fetch student profile"
            });
        }


        if (results.length === 0) {

            return res.status(404).json({
                success: false,
                message: "Student profile not found"
            });

        }


        res.status(200).json({

            success: true,
            student: results[0]

        });

    });

};



// ===============================
// UPDATE STUDENT PROFILE
// ===============================
exports.updateStudentProfile = (req, res) => {

    const userId = req.params.userId;

    Student.updateStudentProfile(
        userId,
        req.body,
        (err, result) => {

            if (err) {

                console.error(err);

                return res.status(500).json({
                    success: false,
                    message: "Unable to update profile"
                });

            }


            res.status(200).json({

                success: true,
                message: "Student profile updated successfully"

            });

        }
    );

};



// ===============================
// GET MY APPLICATIONS
// ===============================
exports.getMyApplications = (req, res) => {

    const userId = req.params.userId;


    Student.getMyApplications(userId, (err, results) => {


        if (err) {

            console.error(err);

            return res.status(500).json({

                success: false,
                message: "Unable to fetch applications"

            });

        }


        res.status(200).json({

            success: true,
            total: results.length,
            applications: results

        });


    });

};
exports.getAllStudents = (req, res) => {

    Student.getAllStudents((err, results) => {

        if (err) {

            return res.status(500).json({
                success: false,
                message: err.message
            });

        }

        res.json(results);

    });

};