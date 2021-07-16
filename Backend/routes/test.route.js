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

router.get('/information/:id', async function (req, res) {
   const id = req.params.id;
   const info = await testModel.getTestGeneralInformation(id, req.type, req.uid);
   res.json(info);
})

router.post('/check/:id', async function (req, res){
   const id = req.params.id;
   const list = await testModel.checkTest(id, req.body.listTestAnswer);
   res.json(list);
})
router.get('/set/:name', async (req, res)=>{
   const set = req.params.name;
   const list = await testModel.getTestBySet(set, req.uid)
   res.json(list)
})
router.get('/code/:code', async (req, res)=>{
   const code = req.params.code;
   const id = await testModel.getTestByCode(code)
   if(id.length === 1)
      res.json(id[0].TestID)
   if(id.length === 0)
      res.json(-1)
})
router.get('/answer/:TestID', async (req, res) => {
   const list = await testModel.getAnswer(req.params.TestID);
   res.json(list);
})

router.get('/ranking/:id', async (req, res) => {
   res.json(await testModel.getRanking(req.params.id));
})
module.exports = router;