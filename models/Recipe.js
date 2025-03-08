const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
  title: String,
  description: String
});

module.exports = mongoose.model("Recipe", RecipeSchema);
