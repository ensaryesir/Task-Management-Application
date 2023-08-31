const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  projectName: String,
  taskName: String,
  taskDescription: String,
  dueDate: Date,
  assignMembers: [String],
});

const Task = mongoose.model("tasks", taskSchema);

module.exports = Task;
