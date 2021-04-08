const express = require('express');
const router = express.Router();
const testModel = require('../models/test.model')

router.get('/', async function (req, res) {
   const list = await testModel.getTestListInValid()
   res.json(list);
})