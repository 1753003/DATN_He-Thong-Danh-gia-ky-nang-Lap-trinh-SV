const express = require('express');
const router = express.Router();
const testModel = require('../models/test.model');
const collectionModel = require('../models/collection.model')
const reportModel = require('../models/report.model')
const bankModel = require('../models/bank.model')
const CryptoJS = require('crypto-js');
router.get('/', async function (req, res) {
   res.json('OK');
})



async function writeNewNotification(id, notiDescription, type) {
   var firebase_realtime = require('firebase');
   // require("firebase/database");
   var config = {
      apiKey: "AIzaSyC_FKi-svb2idZpvqsfPFWASeHUS60O9eU",
      authDomain: "devcheckpro.firebaseapp.com",
      projectId: "devcheckpro",
      storageBucket: "devcheckpro.appspot.com",
      messagingSenderId: "594608048066",
      appId: "1:594608048066:web:fe4fadd828cdc36181f85b",
      measurementId: "G-44GFLD429W"
   };

   firebase_realtime.initializeApp(config);
    let unreadCount, totalNotiCount;
    var ref = firebase_realtime.database().ref('users/' + id);
    ref.get()
    .then((snapshot) => {
        if (snapshot.exists())
        {
            console.log(snapshot.val());
            unreadCount = snapshot.val().unreadCount + 1;
            totalNotiCount = snapshot.val().totalNotiCount + 1;
        }
        else {
            unreadCount = 1;
            totalNotiCount = 1;
        }
    }) 
    .then(() => {
        firebase_realtime.database().ref('users/'+id).update({unreadCount: unreadCount, totalNotiCount: totalNotiCount});
        firebase_realtime.database().ref('users/'+id+'/notifications').push({
            description: notiDescription,
            datetime: Date.now(),
            read: false,
            type: type
        })
    })
    //
    //ref.on('value', (snapshot) => {
    //    console.log(snapshot.val());
    //})
}


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
   const listEmail = req.body.listEmail;
   generalInformation.CreatedBy = req.uid;
   generalInformation.TestCode = result;
   await testModel.createTest(generalInformation, req.body.listQuestion, listEmail, result, req.uid);
   writeNewNotification(req.uid, 'You have a new test invitation.', 'Notification')
   res.json(result);
  
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
   const test = await testModel.getTestByID(testID, req.type, req.uid);
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
   console.log(users)
   res.json(users);
})

router.post('/report/user/:id', async function (req, res) {
   res.json(await reportModel.getUserDetail (req.params.id, req.body.username))
})

router.get('/report/question/:id', async function (req, res) {
   const questions = await reportModel.getQuestion (req.params.id);
   res.json(questions);
})

router.post('/report/compare/:id', async function (req, res) {
   res.json(await reportModel.compareCoding(req.params.id, req.body.username));
})
/*
* Bank routes
* =================================================================================================
*/

router.get('/bank', async function (req, res) {
   const questions = await bankModel.getList(req.uid);
   res.json(questions);
})

router.get('/bank/:id', async function (req, res) {
   const question = await bankModel.getByID(req.params.id);
   res.json(question);
})

///////


module.exports = router;