const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
app.use(cors());

// Setup Routes
const gradeRoutes = require("./src/routes/GradeRoutes");
app.use(`/`, gradeRoutes);

mongoose.connect(process.env.CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");

  // once connected, start the server
  app.listen(3000, () => {
    console.log("Server listening on port 3000");
  });
});
