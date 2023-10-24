const mongoose = require("mongoose");
const { Schema } = mongoose;

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "it cannot be blank"],
    trim: true,
    maxlength: [30, "cannot be more than 30 chars"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Task", TaskSchema);
