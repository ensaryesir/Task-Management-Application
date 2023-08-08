module.exports.home = function (req, res) {
  res.render("view-home/home/home");
};

module.exports.login = function (req, res) {
  res.render("view-home/home/login");
};

module.exports.registration = function (req, res) {
  res.render("view-home/home/registration");
};

module.exports.resetPassword = function (req, res) {
  res.render("view-home/home/reset-password");
};

module.exports.error = function (req, res) {
  res.render("view-home/home/404-error");
};
