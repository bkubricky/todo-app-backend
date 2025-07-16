var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Todos = require("../models/Todos");
require("dotenv").config();

// Body parsing middleware

mongoose.connect(`${process.env.MONGODB_URI}`);

/* GET home page. */
router.get("/", async function (req, res, next) {
  const todoList = await Todos.find();
  res.send(todoList);
});

router.post("/new", async function (req, res) {
  await Todos.create(req.body);
  res.status(200);
});

router.post("/:id/update", async function (req, res) {
  const { id } = req.params;
  await Todos.findOneAndUpdate({ id: id }, req.body);
  res.status(200);
});

router.post("/:id/delete", async function (req, res) {
  const { id } = req.params;
  await Todos.deleteOne({ id: id });
  res.status(200);
});
module.exports = router;
