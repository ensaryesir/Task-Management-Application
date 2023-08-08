const express = require("express");
const router = express.Router();
const controller = require("../controller/controller");

router.get("/home", controller.home);
router.get("/login", controller.login);
router.get("/registration", controller.registration);
router.get("/error", controller.error);

module.exports = router;