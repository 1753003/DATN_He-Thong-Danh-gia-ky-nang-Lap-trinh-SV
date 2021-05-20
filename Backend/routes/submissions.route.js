const express = require('express');
const router = express.Router();
const submisisionsModel = require('../models/submissions.model')

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
    await submisisionsModel.postTestSubmission(req.uid, submission);
    res.json(
        'OK'
    )
})

router.get('/check/:id', async function(req, res) {
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