import Todo from "../models/todoModel.js";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";

//@desc Get all todos
//@route GET api/todos
//@access Private
const getTodos = asyncHandler(async (req, res) => {
  const todos = await Todo.find({ user: req.user.id });

  res.status(200).json(todos);
});

//@desc Create a todo
//@route POST api/todos
//@access Private
const createTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.create({ text: req.body.text, user: req.user.id });
  if (!req.text) {
    res.status(201).json(todo)
  throw new Error('Please add a todo')};
});

//@desc Update a todo
//@route PUT api/todos/:id
//@access Private
const updateTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) {
    res.status(400);
    throw new Error("todo not found");
  }
  //check if user exists
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("user not found");
  }

  //Make sure logged in user matches todo creator
  if (todo.user.toString() !== user.id) {
    res.status(401);
    throw new Error("user not authorized");
  }

  const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedTodo);
});

//@desc Delete a todo
//@route DELETE api/todos/:id
//@access Private

const deleteTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) {
    res.status(400)
    throw new Error("todo not found")
  }
  //check if user exists
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("user not found");
  }

  //Make sure logged in user matches todo creator
  if (todo.user.toString() !== user.id) {
    res.status(401);
    throw new Error("user not authorized");
  }

  await todo.remove();

  res.status(200).json({ id: req.params.id });
});

export { getTodos, createTodo, updateTodo, deleteTodo };
