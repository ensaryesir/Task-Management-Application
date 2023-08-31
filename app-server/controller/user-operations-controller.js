const User = require("../models/user-model");

module.exports.list = function (req, res) {
  res.render("view-app/user-operations/user-list");
};

module.exports.edit = function (req, res) {
  res.render("view-app/user-operations/user-profile-edit");
};

exports.SaveOrUpdateUserProfile = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      userName,
      city,
      contactNumber,
      email,
      gender,
      dob,
      maritalStatus,
      age,
      address,
    } = req.body;

    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      existingUser.firstName = firstName;
      existingUser.lastName = lastName;
      existingUser.userName = userName;
      existingUser.city = city;
      existingUser.contactNumber = contactNumber;
      existingUser.gender = gender;
      existingUser.dob = dob;
      existingUser.maritalStatus = maritalStatus;
      existingUser.age = age;
      existingUser.address = address;

      await existingUser.save();

      res.redirect("/user-list");
    } else {
      const newUser = new User({
        firstName,
        lastName,
        userName,
        city,
        contactNumber,
        email,
        gender,
        dob,
        maritalStatus,
        age,
        address,
      });

      await newUser.save();

      res.redirect("/user-list");
    }
  } catch (error) {
    console.error("Profil güncelleme hatası:", error);
    res.status(500).json({ error: "Bir hata oluştu." });
  }
};

exports.changePassword = async (req, res) => {
  
};
