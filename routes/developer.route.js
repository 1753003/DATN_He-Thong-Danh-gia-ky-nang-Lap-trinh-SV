const express = require('express');
const router = express.Router();
const developerModel = require('../models/developer.model')

router.get('/', async function(req, res){
    console.log('uid: ',req.uid);
    const list = await developerModel.get(req.uid);
    res.json(list);
})
router.get('/invite', async function(req, res){
    // console.log('uid: ',req.uid);
    const list = await developerModel.getInviteList(req.uid);
    // console.log(list)
    res.json(list);
})
router.get('/answersheet/:id', async function(req, res){
    const list = await developerModel.getAnswerSheet(req.uid, req.params.id);
    console.log(list)
    res.json(list);
})
router.patch('/', async (req, res) => {
    await developerModel.update(req.uid, req.body)
    res.json (await developerModel.get(req.uid))
})


module.exports = router;