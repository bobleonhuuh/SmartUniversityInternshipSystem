const express = require("express");
const router = express.Router();

const applicationController = require("../controllers/applicationController");

router.post("/", applicationController.apply);

router.get("/", applicationController.getAll);

router.get("/student/:studentId", applicationController.myApplications);

router.put("/:applicationId/status", applicationController.updateStatus);

router.get("/internship/:internshipId", applicationController.getApplicants);

module.exports = router;