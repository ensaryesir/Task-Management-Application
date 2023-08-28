const express = require("express");
const router = express.Router();
const projectController = require("../controller/project-controller");

router.get("/project", projectController.listProject);

router.post("/project", projectController.createProject);

module.exports = router;
