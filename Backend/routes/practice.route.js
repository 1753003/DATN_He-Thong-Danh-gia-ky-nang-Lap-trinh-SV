const express = require('express');
const router = express.Router();
const practiceModel = require('../models/practice.model')
const questionModel = require('../models/question.model')

router.get('/', async function (req, res) {
  const list = await practiceModel.getAllPractice()
  res.json(list);
})

router.get('/', async function (req, res) {
  const set = req.query.set;
  const list = await practiceModel.getPracticeList(set)
  res.json(list);
})

router.get('/', async function (req, res){
  const level = req.query.level;
  const list = await practiceModel.getPracticeByLevel(difficultLevel);
})

router.get('/:id', async function (req, res) {
  const qid = req.params.id;
  const list = await questionModel.getPracticeQuestionListDetail(qid)
  res.json(list);
})


module.exports = router;