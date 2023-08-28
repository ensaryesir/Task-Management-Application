module.exports.index = function (req, res) {
  res.render("view-app/main-page/index");
};

module.exports.calender = function (req, res) {
  res.render("view-app/main-page/calender");
};

module.exports.employee = function (req, res) {
  res.render("view-app/main-page/employee");
};
module.exports.faq = function (req, res) {
  res.render("view-app/main-page/faq");
};

module.exports.task = function (req, res) {
  res.render("view-app/main-page/task");
};
