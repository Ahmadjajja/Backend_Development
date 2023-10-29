const mongoose = require("mongoose");

// Define the schema
const neighborhoodsSchema = new mongoose.Schema({
  _id: String,
  name: String, // Assuming coordinates is an array of numbers
});

// Create the Grade model
const neighborhoodsModel = mongoose.model("neighborhoods", neighborhoodsSchema);

module.exports = neighborhoodsModel; // Export the model
