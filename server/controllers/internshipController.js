const Internship = require("../models/internshipModel");

// ===============================
// GET ALL INTERNSHIPS
// ===============================
exports.getAll = (req, res) => {

    Internship.getAllInternships((err, results) => {

        if (err) {

          console.error(err);

          return res.status(500).json({
              success: false,
              message: err.message,
              error: err
          });

       }

        res.status(200).json(results);

    });

};

// ===============================
// CREATE INTERNSHIP
// ===============================
exports.create = (req, res) => {

    Internship.createInternship(req.body, (err, result) => {

        if (err) {
            console.error(err);

            return res.status(500).json({
                success: false,
                message: "Unable to post internship"
            });
        }

        res.status(201).json({
            success: true,
            message: "Internship posted successfully",
            internshipId: result.insertId
        });

    });

};

// ===============================
// DELETE INTERNSHIP
// ===============================
exports.delete = (req, res) => {

    Internship.deleteInternship(req.params.id, (err) => {

        if (err) {
            console.error(err);

            return res.status(500).json({
                success: false,
                message: "Unable to delete internship"
            });
        }

        res.json({
            success: true,
            message: "Internship deleted successfully"
        });

    });

};