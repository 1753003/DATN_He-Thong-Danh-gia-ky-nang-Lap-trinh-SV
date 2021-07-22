const express = require('express');
const router = express.Router();
const submisisionsModel = require('../models/submissions.model')
const testModel = require('../models/test.model')
const reportModel = require('../models/report.model')
router.get('/', async function(req, res){
    console.log(req.uid);
    const listTest = await submisisionsModel.getTestSubmissions(req.uid);
    const listPractice = await submisisionsModel.getPracticeSubmissions(req.uid);
    
    res.json({
        test: listTest,
        practice: listPractice
    });
})

router.post('/test', async function(req,res) {
    const submission = req.body;
    console.log(submission)
    const answer = await (testModel.getAnswer(req.body.TestID));
    
    let score = 0;
    let numCorrect = 0;
    let count = 0;
    for (let i of submission.ListAnswer) {
        if (i.Type == "MultipleChoice") {
            console.log(i)
            if (
                answer[count].CorrectAnswer.length === i.Choice.length &&
                answer[count].CorrectAnswer.every((val, index) => val === i.Choice[index])
              ) {
                score += answer[count].Score;
                numCorrect++;
              }
        }
        count++;
    }
    submission.Score += score;
    submission.CorrectPercent = ((submission.CorrectPercent + numCorrect) / answer.length) * 100;
    await submisisionsModel.postTestSubmission(req.uid, submission);

    const statics = await submisisionsModel.getStatics(submission.TestID);
    let percentSuccess = 0
    let percentPass = 0

    console.log(statics)
    if (submission.Score >= statics.PassScore) {
        if (statics.Num - 1 == 0)
            percentPass = 100
        else
            percentPass = ((statics.PercentPass * (statics.Num - 1) /100) + 1) * 100 / (statics.Num);
    }
    else {
        
        if (statics.PercentPass == 0)
            percentPass = 0;
        else {
            percentPass = (statics.PercentPass * (statics.Num - 1)) / parseFloat(statics.Num);
        }
    }

    if (submission.Score == statics.MaxScore) {
        if (statics.Num == 1)
            percentSuccess = 100
        else
            percentSuccess = ((statics.PercentSuccess * (statics.Num - 1) /100) + 1) * 100 / (statics.Num);
    }
    else {
        if (statics.PercentSuccess == 0)
            percentSuccess = 0;
        else
            percentSuccess = (statics.PercentSuccess * (statics.Num - 1) / 100) * 100 / (statics.Num);
    }
    console.log(percentPass, percentSuccess)
    await reportModel.updateReport(submission.TestID, percentPass, percentSuccess)

    res.json(
        'OK'
    )
})

router.get('/check/:id', async function(req, res) {
    console.log(req.params.id)
    const response = await submisisionsModel.checkExist(req.uid, req.params.id);
    res.json(response)
})
router.get('/coding/:id', async function(req, res) {
    const response = await submisisionsModel.getAnswerCodingSubmission(req.params.id);
    res.json(response)
})
router.get('/multiplechoice/:id', async function(req, res) {
    const response = await submisisionsModel.getAnswerMultipleChoiceSubmission(req.params.id);
    res.json(response)
})


module.exports = router;