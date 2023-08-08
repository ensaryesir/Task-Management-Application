const express = require("express");
const router = express.Router();
const controller = require("../controller/home-controller");

router.get("/home", controller.home);
router.get("/login", controller.login);
router.get("/registration", controller.registration);
router.get("/reset-password", controller.resetPassword);
router.get("/404-error", controller.error);

module.exports = router;