const mongoose = require('mongoose');

// Schema: Defines the structure and rules for a todo document
const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

// Export the compiled model
module.exports = mongoose.model('Todo', todoSchema);