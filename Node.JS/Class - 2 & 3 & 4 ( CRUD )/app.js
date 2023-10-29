const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

// create app
const app = express();

// cors
app.use(cors());
app.use(express.json());

// routes
const userRoutes = require("./src/routes/userRoutes");
app.use("/", userRoutes);

// Mongodb connection
mongoose.connect(process.env.CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
// ===========================Mongodb Connection Scenarios==============================
//          1-                                               2-
//  Handle control if your                        Handle control if your db
//  db not connected successfuly                      connected successfuly

// 1- scenario when mongodb not connected
db.on("error", (error) => {
  console.log("Mongodb error : ", error);
});

// 2- scenario when mongodb connected

db.once("open", () => {
  console.log("Mongodb connected sucessfully!");
  const port = process.env.PORT;
  app.listen(port, () => {
    console.log(`server is running on ${port} port`);
  });
});
