const express = require("express");
const router = express.Router();
const controller = require("../controller/main-page-controller");

router.get("/index", controller.index);
router.get("/calender", controller.calender);
router.get("/desk", controller.desk);
router.get("/employee", controller.employee);
router.get("/faq", controller.faq);
router.get("/invoice", controller.invoice);
router.get("/pricing", controller.pricing);
router.get("/project", controller.project);
router.get("/task", controller.task);
router.get("/timeline", controller.timeline);

module.exports = router;
