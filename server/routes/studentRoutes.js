const express = require("express");
const router = express.Router();

const studentController = require("../controllers/studentController");

// My Applications
router.get("/:userId/applications", studentController.getMyApplications);

// Get Student Profile
router.get("/:userId", studentController.getStudentProfile);

// Update Student Profile
router.put("/:userId", studentController.updateStudentProfile);

router.get("/", studentController.getAllStudents);

module.exports = router;