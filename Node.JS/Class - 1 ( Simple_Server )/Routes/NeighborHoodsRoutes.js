const express = require("express");
const router = express.Router();
const neighborhoodsModel = require("../models/Neighborhoods");

router.get("/neighborhoods", async (req, res) => {
  const neighborhoods = await neighborhoodsModel.find();
  res.json(neighborhoods);
});

module.exports = router;
