const express = require("express");
const router = express.Router();
const controller = require("../controller/home-controller");

router.get("/home", controller.home);
router.get("/login", controller.login);
router.get("/registration", controller.registration);
router.get("/404-error", controller.error);
router.get("/forgot-password", controller.showForgotPasswordPage);
router.get("/reset-password", controller.resetPasswordPage);

module.exports = router;
