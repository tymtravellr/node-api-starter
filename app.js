const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const { createTodo, getTodos, getTodo, updateTodo, deleteTodo } = require('./controller/todo');

const app = express();
const port = process.env.PORT || 8080;
const uri = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(uri)
    .then(() => { console.log('Connected to MongoDB'); })
    .catch(err => { console.log('Error connecting to MongoDB', err.message) })

// express middleware
app.use(express.json());
app.use(cors());

/* ********** CRUD ********** */
// Create a todo
app.post('/todos', createTodo);

// Read all todos
app.get('/todos', getTodos);

// Read a todo
app.get('/todos/:id', getTodo);

// Update a todo
app.put('/todos/:id', updateTodo);

// Delete a todo
app.delete('/todos/:id', deleteTodo);

/* ********** CRUD ********** */

app.get('/', (req, res) => {
    //send html file
    res.sendFile(__dirname + '/index.html');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});