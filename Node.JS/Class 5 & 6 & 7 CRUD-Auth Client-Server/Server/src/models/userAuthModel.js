const mongoose = require("mongoose");

const userAuthSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
  },

  { collection: "userAuth", versionKey: false }
);

const User = mongoose.model("userAuth", userAuthSchema);

module.exports = User;
