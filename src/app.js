const express = require('express');
const mongoose = require('mongoose'); // Add this
const app = express();
app.use(express.json());

// Connect to MongoDB using the environment variable from Docker Compose
const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/tasksdb';
mongoose.connect(mongoUrl)
  .then(() => console.log('Connected to MongoDB successfully!'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

const tasksRouter = require('./routes/tasks');


app.get('/', (req, res) => { 
res.json({ message: "Task Manager API running (Lab2)" }); 
}); 

app.use('/tasks', tasksRouter); 

if (require.main === module) { 
app.listen(3000, () => console.log("API running on port 3000")); 
} 
module.exports = app;
