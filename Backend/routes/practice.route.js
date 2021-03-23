const express = require('express');

const router = express.Router();

router.get('/', async function(req, res){
    const list = await practiceModel.getAll();
    res.json(list);
})

router.get('/getbyset/:setname', async function(req, res){
    const setname = req.params.setname || -1;
    const list = await practiceModel.getBySet(setname);
})

router.get('/practicedetail/:id', async function(req, res){
    const id = req.params.id || -1;
    const list = await practiceModel.getByID(id);
    res.json(list);
})