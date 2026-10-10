const express = require('express');
const mongoose = require('mongoose');
const Todo = require('./models/Todo');

const app = express();
const PORT = 3000;

// MongoDB Connection URI (will use Docker container hostname when containerized)
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/tododb';

// Middleware to parse incoming JSON payload
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB successfully!'))
  .catch((err) => console.error('MongoDB connection error:', err));

// 1. GET /todos - Get all todos
app.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. POST /todos - Create a new todo
app.post('/todos', async (req, res) => {
  try {
    const todo = new Todo({
      title: req.body.title,
    });
    const savedTodo = await todo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 3. GET /todos/:id - Get a single todo by ID
app.get('/todos/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ error: 'Todo not found' });
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 4. PUT /todos/:id - Update a todo by ID
app.get('/todos/:id', async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { title: req.body.title, completed: req.body.completed },
      { new: true } // Return the updated document
    );
    if (!updatedTodo) return res.status(404).json({ error: 'Todo not found' });
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 5. DELETE /todos/:id - Delete a todo by ID
app.delete('/todos/:id', async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
    if (!deletedTodo) return res.status(404).json({ error: 'Todo not found' });
    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});