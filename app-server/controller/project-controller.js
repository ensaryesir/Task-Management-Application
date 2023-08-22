const Project = require("../models/project-model");

exports.createProject = async (req, res) => {
  try {
    const {
      projectName,
      projectDescription,
      categories,
      dueDate,
      assignMembers,
    } = req.body;

    const newProject = new Project({
      projectName,
      projectDescription,
      categories,
      dueDate,
      assignMembers: assignMembers
        .split(",")
        .map((assignMembers) => assignMembers.trim()),
    });

    await newProject.save();

    // After adding a new appointment, redirect to the appointments page
    res.redirect("/project");
  } catch (error) {
    console.error("Proje oluşturma hatası:", error);
    res.status(500).json({ error: "Bir hata oluştu." });
  }
};