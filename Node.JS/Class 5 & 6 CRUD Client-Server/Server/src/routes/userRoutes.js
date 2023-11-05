const express = require("express");
const router = express.Router();
const Users = require("../models/userModel");
const mongoose = require("mongoose");

// Read users data
router.get("/users", async (req, res) => {
  const usersData = await Users.find();
  res.json(usersData);
});

// Read a specific user data
router.get("/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const userData = await Users.findById(userId);

    if (!userData) {
      return res.status(404).json({ message: "User not found!" });
    }
    res.status(200).json({ userData: userData });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Create user

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
    console.log("error : ", error);
    res.json({ error: "something went wrong!" });
  }
});

// delete user
router.delete("/deleteUser/:id", async (req, res) => {
  try {
    // req.params == {
    //   id: "3456780987345678909460876567";
    // }
    console.log(req.params);
    const userId = req.params.id;
    const deletedUser = await Users.findByIdAndRemove(userId);
    console.log("deletedUser : ", deletedUser);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found!" });
    }

    return res.json({ message: "user deleted successfuly!" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// UpdateData

router.put("/updateUser/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const dataToBeUpdate = new Users({
      name: req.body.name,
      age: req.body.age,
      email: req.body.email,
      favouriteHobbies: req.body.favouriteHobbies,
    });

    const updatedData = await Users.findByIdAndUpdate(userId, dataToBeUpdate, {
      new: true,
    });
    console.log("updatedData : ", updatedData);

    if (!updatedData) {
      return res.status(404).json({ message: "User not found!" });
    }

    return res.json({ message: "user updated successfuly!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
