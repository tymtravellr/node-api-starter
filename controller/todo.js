const asyncHandler = require("express-async-handler");
const Todo = require("../models/Todo");

// Create a todo
const createTodo = asyncHandler(async (req, res) => {
    const todo = req.body;
    console.log(todo);
    const newTodo = new Todo({
        title: todo.title,
        description: todo.description,
        completed: todo.completed,
    });
    console.log(newTodo);
    await newTodo.save();
    res.send("Todo created");
});

// Read all todos
const getTodos = asyncHandler(async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
});

// Read a todo
const getTodo = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const todo = await Todo.findById(id);
    res.json(todo);
});

// Update a todo
const updateTodo = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const todo = await Todo.findById(id);
    todo.title = req.body.title || todo.title;
    todo.description = req.body.description || todo.description;
    todo.completed = req.body.completed || todo.completed;
    await todo.save();
    res.json(todo);
});

// Delete a todo
const deleteTodo = asyncHandler(async (req, res) => {
    const id = req.params.id;
    await Todo.findByIdAndDelete(id);
    res.send("Todo deleted");
});

module.exports = {
    createTodo,
    getTodos,
    getTodo,
    updateTodo,
    deleteTodo,
};

