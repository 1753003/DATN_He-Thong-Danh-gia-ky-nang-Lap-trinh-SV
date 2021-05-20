const express = require('express');
const router = express.Router();
const practiceModel = require('../models/practice.model')
const questionModel = require('../models/question.model');
const submissionsModel = require('../models/submissions.model');

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

router.post('/submitcheck', async function (req,res){
  const data = req.body;
  var dataArray = Object.values(JSON.parse(JSON.stringify(data)))
  dataArray.forEach(x=> delete x["id"])
  let userChoices = []
  dataArray.forEach(item=>{
    userChoices.push(item)
  })
  let qidList = []
  dataArray.forEach(item=>{
    qidList.push(item.qid)
  })
  const answer = await practiceModel.getAnswerMultipleChoice(qidList)
  
  let result = []
  let correctCount = 0;
  let totalUserChoice = 0;
  userChoices.forEach(question=>{
    let tmp = {}
    tmp.qid = question.qid
    // console.log(answer[question.qid].list,question.list)
    tmp.res = answer[question.qid].list.every((val, index) => val === question.list[index])
    if(tmp.res) correctCount+=1
    totalUserChoice +=1
    answer[question.qid].list === question.list
    result.push(tmp)
  })
  //save submission to db
  const dbSubmission = {
    SubmissionType: "MultipleChoice",
    PracticeID: 2,//
    DevID:"zcwVw4Rjp7b0lRmVZQt6ZXmspql1",//
    AnsweredNumber:1,
    CorrectPercent: Number((correctCount / totalUserChoice).toFixed(4)) * 100,
    DoingTime: 100,
    Score:100,
  }
  const dbSubmissionRes = await practiceModel.saveSubmissions(dbSubmission)
  userChoices.forEach(async item=>{
    console.log(item)
    let choice = await practiceModel.getIndexMultipleChoice(item.qid, item.list)
    console.log(choice)
    let dbAnswer = {
      SubmissionID : dbSubmissionRes[0],//
      Choice : JSON.stringify(choice),//
      QuestionID: item.qid //
    }
    await submissionsModel.saveSubmissionAnswerMultipleChoice(dbAnswer)
  })
  
  //
  res.json(correctCount)
})
router.get('/:id', async function (req, res) {
  const qid = req.params.id;
  const list = await questionModel.getPracticeQuestionListDetail(qid)
  res.json(list);
})
router.post('/submissions', async function (req, res) {
  const data = req.body;
  data.DevID = req.uid

  let tmpTCPassed = []
  let tmpOuput = []
  JSON.parse(data.Answer).forEach((item,i)=>{
    tmpOuput.push(item.stdout)
    if(item.expected_output === item.stdout) 
      tmpTCPassed.push(i)
  })
  let tmp={
    TestCasePassed: JSON.stringify(tmpTCPassed),
    DescriptionCode: JSON.parse(data.Answer)[0].source_code,
    UsedLanguage : JSON.parse(data.Answer)[0].language.id,
    OutputTestcase: JSON.stringify(tmpOuput)
  }
  delete data['Answer']
  const ret = await practiceModel.saveSubmissions(data)
  tmp.SubmissionID = ret[0]
  let tempQID = await practiceModel.getQuestionID(data.PracticeID)
  tmp.QuestionID = tempQID[0].QuestionID[0]

  await practiceModel.saveAnswerCoding(tmp)
  res.json(ret);
})
router.get('/', async function (req, res) {
  const set = req.query.set.split(' ')[0];
  const list = await practiceModel.getPracticeList(set)
  res.json(list);
})


module.exports = router;