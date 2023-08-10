module.exports.account = function (req, res) {
  res.render("view-app/user-operations/user-account-setting");
};
module.exports.add = function (req, res) {
  res.render("view-app/user-operations/user-add");
};
module.exports.list = function (req, res) {
  res.render("view-app/user-operations/user-list");
};
module.exports.privacy = function (req, res) {
  res.render("view-app/user-operations/user-privacy-setting");
};
module.exports.edit = function (req, res) {
  res.render("view-app/user-operations/user-profile-edit");
};
module.exports.profile = function (req, res) {
  res.render("view-app/user-operations/user-profile");
};
