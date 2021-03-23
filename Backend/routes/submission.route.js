const express = require('express');

const router = express.Router();

router.get('/', async function(req, res){
    const list = await submissionModel.getAll();
    res.json(list);
})

router.get('/getbydevid:id', async function(req, res){
    const id = req.params.id || -1;
    const list = await submissionModel.getByDevID(id);
    res.json(list);
})

router.post('/', async function (req, res) {
    await submissionModel.add(req.body);
    res.status(201).json(await submissionModel.getAll());
})