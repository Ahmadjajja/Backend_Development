const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.ObjectId,
    name: String,
    age: Number,
    email: String,
    favouriteHobbies: [String],
  },
  // Mongoose is trying to be smart by making your collection name plural.
  // You can however force it to be whatever you want by adding below code
  // to the schema
  { collection: "userInfo", versionKey: false }
);

const Users = mongoose.model("userInfo", userSchema);

module.exports = Users;
