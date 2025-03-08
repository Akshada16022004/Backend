const bcrypt = require("bcryptjs");
const User = require("../models/User"); // Adjust path based on your structure

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // 1️⃣ Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" }); // 🚨 User not found
    }

    // 2️⃣ Compare entered password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" }); // 🚨 Wrong password
    }

    // 3️⃣ If everything is good, send success response
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { loginUser };
