const express = require('express');
const router = express.Router();
const developerModel = require('../models/developer.model')

router.get('/', async function(req, res){
    console.log('uid: ',req.uid);
    const list = await developerModel.get(req.uid);
    res.json(list);
})

router.get('/practice', async (req, res) => {

})

module.exports = router;