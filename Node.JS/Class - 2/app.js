const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

// create app
const app = express();

// cors
app.use(cors());

// routes

// Mongodb connection
mongoose.connect(process.env.CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
// scenario when mongodb not connected
db.on("error", (error) => {
  console.log("Mongodb error : ", error);
});

// scenario when mongodb connected

db.once("open", () => {
  console.log("Mongodb connected sucessfully!");
  const port = process.env.PORT;
  app.listen(port, () => {
    console.log(`server is running on ${port} port`);
  });
});

// ===========================Mongodb Connection ==============================
//          1-                                               2-
//  Handle control if your                        Handle control if your db
//  db not connected successfuly                      connected successfuly
