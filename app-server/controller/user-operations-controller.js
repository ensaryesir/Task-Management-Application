module.exports.list = function (req, res) {
  res.render("view-app/user-operations/user-list");
};

module.exports.edit = function (req, res) {
  res.render("view-app/user-operations/user-profile-edit");
};
