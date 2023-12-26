const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;
const uri = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(uri)
.then(() => {console.log('Connected to MongoDB');})
.catch(err => {console.log('Error connecting to MongoDB', err.message)})

// express middleware
app.use(express.json());
app.use(cors());

/* ********** CRUD ********** */
const Todo = require('./models/Todo');
// Create a todo

app.post('/todos', async (req, res) => {
    const todo = req.body;
    const newTodo = new Todo({
        title: todo.title,
        description: todo.description,
        completed: todo.completed
    });
    console.log(newTodo)
    await newTodo.save();
    res.send('Todo created');
});

// Read all todos

app.get('/todos', async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
});

// Read a todo

app.get('/todos/:id', async (req, res) => {
    const id = req.params.id;
    const todo = await Todo.findById(id);
    res.json(todo);
});

// Update a todo

app.put('/todos/:id', async (req, res) => {
    const id = req.params.id;
    const todo = await Todo.findById(id);
    todo.title = req.body.title || todo.title;
    todo.description = req.body.description || todo.description;
    todo.completed = req.body.completed || todo.completed;
    await todo.save();
    res.json(todo);
});

// Delete a todo

app.delete('/todos/:id', async (req, res) => {
    const id = req.params.id;
    await Todo.findByIdAndDelete(id);
    res.send('Todo deleted');
});

/* ********** CRUD ********** */

app.get('/', (req, res) => {
    //send html file
    res.sendFile(__dirname + '/index.html');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});