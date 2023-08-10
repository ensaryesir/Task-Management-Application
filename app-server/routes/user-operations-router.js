const express = require("express");
const router = express.Router();
const controller = require("../controller/user-operations-controller");

router.get("/user-account-setting", controller.account);
router.get("/user-add", controller.add);
router.get("/user-list", controller.list);
router.get("/user-privacy-setting", controller.privacy);
router.get("/user-profile-edit", controller.edit);
router.get("/user-profile", controller.profile);

module.exports = router;
