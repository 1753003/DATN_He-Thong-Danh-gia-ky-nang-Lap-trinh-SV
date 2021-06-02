const express = require('express');
const router = express.Router();
const testModel = require('../models/test.model');
const collectionModel = require('../models/collection.model')
const reportModel = require('../models/report.model')

router.get('/', async function (req, res) {
   res.json('OK');
})

/*
* Test routes
* =================================================================================================
*/

router.post('/test', async function (req, res) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < 6; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }

   var generalInformation = req.body.generalInformation;
   generalInformation.CreatedBy = req.uid;
   generalInformation.TestCode = result;
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

router.get('/test/:id', async function (req, res) {
   const testID = req.params.id;
   const test = await testModel.getTestByID(testID);
   console.log(test)
   res.json(test);
})

router.patch('/test/:id', async function (req, res) {
   await testModel.updateTest(req.body, req.params.id);
   res.json("OK")
})
/*
* Collection routes
* =================================================================================================
*/
router.post('/collection', async function (req, res) {
   const uid = req.uid;
   var newCollection = req.body;
   newCollection.CreatedBy = uid;
   newCollection.TestID = JSON.stringify([]);
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

router.post('/collection/addTest', async function (req, res) {
   const testID = req.body.testID;
   const collectionID = req.body.collectionID;
   await collectionModel.addTest(testID, collectionID);
   res.json('OK');
})

router.patch('/collection', async function (req, res) {
   await collectionModel.editCollection(req.body.collectionID, req.body.editCollection);
   res.json('OK');
})

router.get('/collection/:id', async function (req, res) {
   const collection = await collectionModel.getCollectionByID(req.params.id);
   res.json(collection); 
})

router.delete('/collection/removeTest', async function(req, res) {
   await collectionModel.removeTest(req.body.collectionID, req.body.testID);
   res.json('OK');
})

router.delete('/collection/:id', async function (req, res) {
   await collectionModel.remove(req.params.id);
   res.json('OK');
})

/*
* Report routes
* =================================================================================================
*/

router.get('/report/getList', async function (req, res) {
   const list = await reportModel.getList(req.uid);
   res.json(list);
})

router.get('/report/summary/:id', async function (req, res) {
   const summary = await reportModel.getSummary (req.params.id);
   
   res.json(summary);
})

router.get('/report/user/:id', async function (req, res) {
   const users = await reportModel.getUser (req.params.id);
   
   res.json(users);
})

router.get('/report/question/:id', async function (req, res) {
   const questions = await reportModel.getQuestion (req.params.id);
   res.json(questions);
})

module.exports = router;