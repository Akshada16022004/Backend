const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB Atlas
mongoose.connect("mongodb+srv://akshadas1602:iYIT5vZWDgPcNTsn@cluster1.drut4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1"
, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Error:", err));


const RecipeSchema = new mongoose.Schema({
  title: String,
  description: String,
  instruction: String
});

const Recipe = mongoose.model('Recipe', RecipeSchema);

app.post("/api/auth/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log("Received Registration Request:", req.body);
    
    // Dummy response for testing
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Registration failed" });
  }
});
app.post("/api/auth/login", async (req, res) => {
  try {
    console.log("Login request received:", req.body);

    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      console.log("User not found");
      return res.status(400).json({ error: "User not found" });
    }

    console.log("User found:", user);
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      console.log("Invalid password");
      return res.status(400).json({ error: "Invalid password" });
    }

    const token = jwt.sign({ email: user.email }, "your-secret-key", { expiresIn: "1h" });

    console.log("Login successful");
    res.json({ message: "Login successful", token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});



// Add recipe API
app.post("/api/recipes", async (req, res) => {
  try {
    const { title, description } = req.body;
    const newRecipe = new Recipe({ title, description });
    await newRecipe.save();
    res.status(201).json({ message: "Recipe added successfully", recipe: newRecipe });
  } catch (error) {
    res.status(500).json({ error: "Failed to add recipe" });
  }
});


// Get all recipes
app.get("/api/recipes", async (req, res) => {
  const recipes = await Recipe.find();
  res.json(recipes);
});
const API_BASE_URL = 'http://localhost:3000'; // Adjust port if necessary



app.listen(5001, () => console.log("Server running"));
