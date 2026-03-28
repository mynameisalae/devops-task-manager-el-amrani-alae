const express = require('express');
const router = express.Router(); 
const mongoose = require('mongoose');

// Define the Schema to use simple Numbers for the ID
const taskSchema = new mongoose.Schema({
  _id: Number,
  title: String,
  completed: Boolean
}, { versionKey: false });

const Task = mongoose.model('Task', taskSchema);

// GET: Fetch tasks and keep them in order
router.get('/', async (req, res) => {
  const tasks = await Task.find().sort({ _id: 1 });
  
  // Format output to look exactly like the old array
  const formattedTasks = tasks.map(task => ({
    id: task._id,
    title: task.title,
    completed: task.completed
  }));
  
  res.json(formattedTasks);
}); 

// POST: Save new task with an auto-incrementing ID
router.post('/', async (req, res) => {
  // Find the highest ID so we can add 1
  const lastTask = await Task.findOne().sort({ _id: -1 });
  const nextId = lastTask ? lastTask._id + 1 : 1; // Starts at 1 if database is empty

  const newTask = new Task({
    _id: nextId,
    title: req.body.title,
    completed: req.body.completed || false
  });
  
  await newTask.save();
  
  // Send back the exact format you want
  res.status(201).json({
    id: newTask._id,
    title: newTask.title,
    completed: newTask.completed
  });
});

module.exports = router;