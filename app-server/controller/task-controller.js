const Task = require("../models/task-model");
const Project = require("../models/project-model");

exports.createTask = async (req, res) => {
  try {
    const { projectName, taskName, taskDescription, dueDate, assignMembers } =
      req.body;

    const newTask = new Task({
      projectName,
      taskName,
      taskDescription,
      dueDate,
      assignMembers: assignMembers.map((member) => member.trim()),
    });

    await newTask.save();

    // After adding a new appointment, redirect to the appointments page
    res.redirect("/task");
  } catch (error) {
    console.error("Proje oluşturma hatası:", error);
    res.status(500).json({ error: "Bir hata oluştu." });
  }
};

exports.listProjectforTask = async (req, res) => {
  try {
    const projects = await Project.find();
    res.render("view-app/main-page/task", { projects: projects });
  } catch (err) {
    console.error("Error fetching project section", err);
    res.status(500).send("Internal Server Error");
  }
};

exports.listTask = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.render("view-app/main-page/task", { tasks: tasks });
  } catch (err) {
    console.error("Error fetching task section", err);
    res.status(500).send("Internal Server Error");
  }
};
