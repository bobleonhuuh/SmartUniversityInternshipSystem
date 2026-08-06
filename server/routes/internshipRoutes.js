const express = require("express");
const router = express.Router();

const internshipController = require("../controllers/internshipController");

router.get("/test", (req, res) => {
    res.json({
        message: "Internship route is working"
    });
});

router.get("/", internshipController.getAll);

router.post("/", internshipController.create);

router.delete("/:id", internshipController.delete);

module.exports = router;