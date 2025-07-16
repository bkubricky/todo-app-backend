const mongoose = require("mongoose");
const { Schema } = mongoose;

const todoSchema = new Schema({
  id: Number,
  text: String,
  completed: Boolean,
});

module.exports = mongoose.model("Todos", todoSchema);
