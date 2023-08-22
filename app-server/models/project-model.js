const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  projectName: String,
  projectDescription: String,
  categories: String,
  dueDate: Date,
  assignMembers: [String],
});

const Project = mongoose.model("projects", projectSchema);

module.exports = Project;
