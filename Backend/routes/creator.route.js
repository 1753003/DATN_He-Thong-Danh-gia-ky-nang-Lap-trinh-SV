const express = require('express');
const router = express.Router();
const testModel = require('../models/test.model');
const collectionModel = require('../models/collection.model')

router.get('/', async function (req, res) {
   res.json('OK');
})

/*
* Test routes
* =================================================================================================
*/

router.post('/test', async function (req, res) {
   var generalInformation = req.body.generalInformation;
   generalInformation.CreatedBy = req.uid;
   await testModel.createTest(generalInformation, req.body.listQuestion);
   res.json("OK");
})

router.get('/test', async function (req, res) {
   const uid = req.uid;
   const listTest = await testModel.getTestByUID(uid);

   listTest.forEach(e => {
      if(e.QuestionID != null)
         e.TotalQuestion = e.QuestionID.length;
   })
   res.json(listTest);
})

router.get('/totalUserDone', async function (req, res) {
   const uid = req.uid;
   return await testModel.getTotalUserDone(); 
})
/*
* Collection routes
* =================================================================================================
*/
router.post('/collection', async function (req, res) {
   const uid = req.uid;
   var newCollection = req.body;
   newCollection.CreatedBy = uid;
   await collectionModel.createCollection(newCollection);
   res.json('OK');
})

router.get('/collection', async function (req, res) {
   const uid = req.uid;
   var listCollection = await collectionModel.getCollectionByUID(uid);
   listCollection.forEach(e => {
      e.TotalTest = e.TestID.length;
   })
   res.json(listCollection);
})
module.exports = router;