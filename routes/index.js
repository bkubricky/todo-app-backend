var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Todos = require("../models/Todos");
require("dotenv").config();

// Body parsing middleware

mongoose.connect(`${process.env.MONGODB_URI}`);

// GET all todos
router.get("/", async function (req, res) {
  const todoList = await Todos.find();
  res.json(todoList); // ✅ Return data
});

// CREATE new todo
router.post("/new", async function (req, res) {
  const newTodo = await Todos.create(req.body);
  res.status(201).json(newTodo); // ✅ Return created item
});

// UPDATE todo
router.post("/:id/update", async function (req, res) {
  const { id } = req.params;
  const updated = await Todos.findOneAndUpdate({ id: id }, req.body, {
    new: true,
  });
  res.status(200).json(updated); // ✅ Return updated item
});

// DELETE todo
router.post("/:id/delete", async function (req, res) {
  const { id } = req.params;
  await Todos.deleteOne({ id: id });
  res.status(200).json({ success: true }); // ✅ Send response
});

module.exports = router;
