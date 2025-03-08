const express = require("express");
const Recipe = require("../models/Recipe");

const router = express.Router();

// Add a new recipe
router.post("/", async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: "Both fields are required." });
    }

    const newRecipe = new Recipe({ title, description });
    const savedRecipe = await newRecipe.save();
    res.status(201).json(savedRecipe);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get all recipes
router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
