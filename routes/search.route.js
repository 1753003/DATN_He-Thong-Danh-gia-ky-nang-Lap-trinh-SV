const express = require("express");
const router = express.Router();

const search = require("../models/search.model");
router.get("/", async function (req, res) {
  const result = await search.getResult(req.query.keyword, req.uid);
  res.json(result);
});

module.exports = router;
