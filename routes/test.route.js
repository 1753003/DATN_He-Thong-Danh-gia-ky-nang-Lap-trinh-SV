const express = require('express');
const router = express.Router();
const testModel = require('../models/test.model')
const questionModel = require('../models/question.model')

router.get('/', async function (req, res) {
   const set = req.query.set;
   const list = await testModel.getTestList(set)
   res.json(list);
})

router.get('/', async function (req, res) {
   res.json('OK');
})

router.get('/question/:id', async function (req, res) {
   const id = req.params.id;
   const list = await questionModel.getPracticeQuestionListDetail(id);
   res.json(list);
})

router.get('/:id', async function (req, res) {
   const id = req.params.id;
   const list = await testModel.getTestByID(id);
   res.json(list);
})

router.post('/check/:id', async function (req, res){
   const id = req.params.id;
   const list = await testModel.checkTest(id, req.body.listTestAnswer);
   res.json(list);
})

module.exports = router;