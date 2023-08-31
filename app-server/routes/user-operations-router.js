const express = require("express");
const router = express.Router();
const userController = require("../controller/user-operations-controller");

router.get("/user-list", userController.list);
router.get("/user-profile-edit", userController.edit);

router.post("/user-profile-edit", userController.SaveOrUpdateUserProfile);

module.exports = router;
