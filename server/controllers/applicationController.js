const Application = require("../models/applicationModel");
const Student = require("../models/studentModel");

// Apply
exports.apply = (req, res) => {

    const { internship_id, student_id, cover_letter } = req.body;

    if (!internship_id) {
        return res.status(400).json({
            success: false,
            message: "internship_id is required"
        });
    }

    if (!student_id) {
        return res.status(400).json({
            success: false,
            message: "student_id is required"
        });
    }

    const createApplication = (resolvedStudentId) => {
        Application.apply(
            {
                internship_id,
                student_id: resolvedStudentId,
                cover_letter
            },
            (err, result) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        success: false,
                        message: err.message
                    });
                }

                res.json({
                    success: true,
                    message: "Application submitted successfully"
                });
            }
        );
    };

    Student.getStudentProfile(student_id, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                success: false,
                message: "Unable to resolve student"
            });
        }

        if (results && results.length > 0) {
            return createApplication(results[0].student_id);
        }

        return res.status(400).json({
            success: false,
            message: "Student not found"
        });
    });

};

// Student Applications
exports.myApplications = (req, res) => {

    Application.getStudentApplications(

        req.params.studentId,

        (err, results) => {

            if (err) {

                return res.status(500).json({

                    success: false,

                    message: err.message

                });

            }

            res.json(results);

        }

    );

};
// Get all applications
exports.getAll = (req, res) => {

    Application.getAllApplications((err, results) => {

        if (err) {

            console.error(err);

            return res.status(500).json({
                success: false,
                message: err.message
            });

        }

        res.json(results);

    });

};

// Update application status
exports.updateStatus = (req, res) => {

    const { applicationId } = req.params;
    const { status } = req.body;

    Application.updateApplicationStatus(
        applicationId,
        status,
        (err) => {

            if (err) {

                console.error(err);

                return res.status(500).json({
                    success: false,
                    message: err.message
                });

            }

            res.json({
                success: true,
                message: "Application status updated successfully"
            });

        }
    );

};

// Employer Applicants for an internship
exports.getApplicants = (req, res) => {
    Application.getApplicants(req.params.internshipId, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.json(results);
    });
};