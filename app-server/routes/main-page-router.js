const express = require("express");
const router = express.Router();
const controller = require("../controller/main-page-controller");

router.get("/index", controller.index);
router.get("/calender", controller.calender);
router.get("/faq", controller.faq);
router.get("/task", controller.task);

module.exports = router;
