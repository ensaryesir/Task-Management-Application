const express = require("express");
const router = express.Router();
const authController = require("../controller/auth-controller");

function authenticateToken(req, res, next) {
  const token = req.cookies.token; // We receive the token from the cookie

  if (!token) {
    return res.redirect("/login");
    //res.status(401).json({ error: "Unauthorized access." });
  }

  jwt.verify(token, "secretKey", (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token." });
    }
    req.user = user; // If the token is verified, we add the user information to the request object
    next();
  });
}

function checkUserSession(req, res, next) {
  // Get user information from the session to check the user's connection
  const user = req.session.user;

  if (user) {
    // If there is user information, switch to the next middleware or route
    next();
  } else {
    // If there is no user information, redirect the user to the login screen
    res.redirect("/login");
  }
}

router.post("/login", authController.userLogin);

router.get("/forgot-password", authController.showForgotPasswordPage);
router.post("/forgot-password", authController.forgotPassword);

router.post("/register", authController.userRegister);

module.exports = router;
