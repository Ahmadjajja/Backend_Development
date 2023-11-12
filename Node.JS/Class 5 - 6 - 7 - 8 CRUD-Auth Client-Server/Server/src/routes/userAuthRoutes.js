const express = require("express");
const router = express.Router();
const User = require("../models/userAuthModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register

router.post("/register", async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 8);

  const userData = new User({
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    const user = await userData.save();
    res.status(201).json({ message: "User registered successfuly!", user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  console.log("user : ", user);

  if (!user) {
    return res.status(404).json({ message: "Authentication failed" });
  }

  const passwordMatched = await bcrypt.compare(
    req.body.password,
    user.password
  );

  console.log("passwordMatched : ", passwordMatched);

  if (!passwordMatched) {
    return res.status(404).json({ message: "Authentication failed" });
  }

  var token = jwt.sign({ id: user._id, admin: false }, process.env.SECRET_KEY);

  return res.status(200).json({ message: "User logged in!", token });
});

module.exports = router;

// JWT ----> Advanced form ----> JWE
