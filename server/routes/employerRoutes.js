const express = require("express");

const router = express.Router();

const employerController = require("../controllers/employerController");

// =================================
// Employer's internships
// =================================
router.get(
    "/:employerId/internships",
    employerController.getEmployerInternships
);

// =================================
// View applicants for an internship
// =================================
router.get(
    "/internships/:internshipId/applications",
    employerController.getInternshipApplications
);

module.exports = router;