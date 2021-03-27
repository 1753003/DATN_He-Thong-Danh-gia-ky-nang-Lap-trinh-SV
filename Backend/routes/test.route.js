const express = require('express');
const router = express.Router();
const testModel = require('../models/test.model')
const questionModel = require('../models/question.model')

router.get('/', async function (req, res) {
   res.json('OK');
})

router.get('/', async function (req, res) {
   const set = req.query.set;
   const list = await testModel.getTestList(set)
   res.json(list);
})

router.get('/question/:id', async function (req, res) {
   const id = req.params.id;
   const list = await questionModel.getQuestionByTestID(id);
   res.json(list);
})

module.exports = router;