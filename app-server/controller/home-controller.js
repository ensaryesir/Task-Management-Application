module.exports.home = function (req, res) {
  res.render("view-home/home/home");
};

module.exports.login = function (req, res) {
  res.render("view-home/home/login");
};

module.exports.registration = function (req, res) {
  res.render("view-home/home/registration");
};

exports.resetPasswordPage = (req, res) => {
  try {
    // resetEmail değişkenini kullanarak reset-password.ejs sayfasını render edin
    res.render("view-home/home/reset-password", { resetEmail: req.session.resetEmail });
  } catch (err) {
    console.error("Error rendering reset password page:", err);
    res.status(500).json({ error: "An error occurred while rendering reset password page." });
  }
};


module.exports.error = function (req, res) {
  res.render("view-home/home/404-error");
};

module.exports.showForgotPasswordPage = (req, res) => {
  res.render("view-home/home/forgot-password");
};
