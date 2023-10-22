const express = require("express");
const router = express.Router();
const Users = require("../models/userModel");
const mongoose = require("mongoose");
router.get("/users", async (req, res) => {
  const userData = await Users.find();
  res.json(userData);
});

router.post("/addUser", async (req, res) => {
  try {
    const userData = new Users({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      age: req.body.age,
      email: req.body.email,
      favouriteHobbies: req.body.favouriteHobbies,
    });
    const result = await userData.save();
    res.json(result);
  } catch (error) {
    res.json({ error: error.message });
  }
});

module.exports = router;
