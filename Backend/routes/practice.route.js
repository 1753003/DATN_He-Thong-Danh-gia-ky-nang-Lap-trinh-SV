const express = require('express');
const router = express.Router();
const practiceModel = require('../models/practice.model')

router.get('/', async function (req, res) {
  const set = req.query.set;
  const list = await practiceModel.getPracticeList(set)
  res.json(list);
})


module.exports = router;