const express = require('express');
const app = express();
app.use(express.json());

const tasksRouter = require('./routes/tasks');


app.get('/', (req, res) => {
  res.json({ message: "DevOps Task Manager API is running (Lab 2)" }); 
});

app.use('/tasks', tasksRouter); 

app.listen(3000, ()=> console.log("API running on port 3000"));
