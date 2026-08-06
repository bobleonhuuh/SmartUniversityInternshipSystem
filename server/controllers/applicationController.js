const Application = require("../models/applicationModel");

// Apply
exports.apply = (req, res) => {

    Application.apply(req.body, (err, result) => {

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