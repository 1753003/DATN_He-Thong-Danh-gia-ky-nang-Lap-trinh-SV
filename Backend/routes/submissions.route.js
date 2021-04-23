const express = require('express');
const router = express.Router();
const submisisonsModel = require('../models/submissions.model')

router.get('/', async function(req, res){
    console.log(req.uid);
    const listTest = await submisisonsModel.getTestSubmissions(req.uid);
    const listPractice = await submisisonsModel.getPracticeSubmissions(req.uid);
    
    res.json({
        test: listTest,
        practice: listPractice
    });
})

module.exports = router;