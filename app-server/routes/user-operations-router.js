const express = require("express");
const router = express.Router();
const controller = require("../controller/user-operations-controller");

router.get("/user-list", controller.list);
router.get("/user-profile-edit", controller.edit);

module.exports = router;
