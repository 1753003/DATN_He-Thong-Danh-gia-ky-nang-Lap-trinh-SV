const express = require('express');
const router = express.Router();
const practiceModel = require('../models/practice.model')
const questionModel = require('../models/question.model')

// router.get('/', async function (req, res) {
//   const set = req.query.set;
//   const list = await practiceModel.getPracticeList(set)
//   res.json(list);
// })

router.get('/submissions', async function (req, res) {
  console.log('submisisons')
  const pid = req.query.pid;
  const uid = req.query.uid;
  const list = await practiceModel.getSubmissions(pid,uid)
  res.json(list);
})

// router.get('/', async function (req, res){
//   const level = req.query.level;
//   const list = await practiceModel.getPracticeByLevel(level);
//   res.json(list);
// })

// router.get('/', async function (req, res) {
//   const list = await practiceModel.getAllPractice()
//   res.json(list);
// })

router.get('/:id', async function (req, res) {
  const qid = req.params.id;
  const list = await questionModel.getPracticeQuestionListDetail(qid)
  res.json(list);
})
router.post('/submissions', async function (req, res) {
  const data = req.body;
  data.DevID = req.uid
  console.log(data)
  const ret = await practiceModel.saveSubmissions(data)
  res.json(ret);
})
router.get('/', async function (req, res) {
  const set = req.query.set.split(' ')[0];
  const list = await practiceModel.getPracticeList(set)
  res.json(list);
})


module.exports = router;