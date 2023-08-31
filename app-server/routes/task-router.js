const express = require("express");
const router = express.Router();
const taskController = require("../controller/task-controller");

router.get("/task", taskController.listProjectforTask, taskController.listTask);
router.post("/task", taskController.createTask);

module.exports = router;
