const express = require("express");
const router = express.Router();
const controller = require("../controller/main-page-controller");

router.get("/index", controller.index);
router.get("/faq", controller.faq);

module.exports = router;
