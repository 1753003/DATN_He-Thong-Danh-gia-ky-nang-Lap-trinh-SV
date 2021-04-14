const express = require('express');
const router = express.Router();
const testModel = require('../models/test.model')

var firebase_realtime = require("firebase/app");
require("firebase/database");
var config = {
    apiKey: "AIzaSyC_FKi-svb2idZpvqsfPFWASeHUS60O9eU",
    authDomain: "devcheckpro.firebaseapp.com",
    databaseURL: "https://devcheckpro-default-rtdb.firebaseio.com",
    storageBucket: "devcheckpro.appspot.com"
};

firebase_realtime.initializeApp(config);

function writeNewNotification(uid, notiDescription, type) {
    firebase_realtime.database().ref('notifications/'+uid).push({
        description: notiDescription,
        datetime: Date.now(),
        read: false,
        type: type
    })
}

router.get('/invalid', async function (req, res) {
   const list = await testModel.getTestListInValid()
   res.json(list);
})

router.get('/sendemail/:id', async function (req, res){
    var nodemailer = require('nodemailer');
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'group7.17clc@gmail.com',
          pass: 'group7.17clc'
        }
    });

    var uid = await testModel.getByUID(req.params.id);
    var email = uid.UserName;
    var bool;
    if (req.query.bool == true){
        bool = true;
    }
    else {
        bool = false;
    }

    if (bool == true){
        var text = "Congratulation! Your test publishing has been censored"
    }
    else {
        var text = "Sorry! Your test publishing has not passed"
    }

    var mailOptions = {
        from: 'group7.17clc@gmail.com',
        to: email,
        subject: `${text}`,
        html: `<h2>Confirm your email on DevCheck website!</h2> 
        <p>Here are your code to confirm your email: </p>
        <p>Ignoring this email if it is not you.</p>
        <hr/>
        <p>Best,</p>
        <p>DEVCHECK team.</p>`
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
    });

    res.json(true);
})

router.get('/:id', async function (req, res){
    res.json(await testModel.getTestByID(req.params.id));
})

router.post('/setvalid/:id', async function (req, res){
    const id = req.params.id;
    const userID = req.body.userID;
    await testModel.setValid(id);
    writeNewNotification(userID, id, true);
    res.json(await testModel.getTestListInValid());
})

router.post('/responseTestRequest/', async function (req, res) {
    const testID = req.body.testID;
    const accept = req.body.accept;
    const userID = req.body.creatorID;
    //const userID = "zcwVw4Rjp7b0lRmVZQt6ZXmspql1"
    
    const testName = (await testModel.getTestByID(testID)).generalInformation.TestName;
    var description;
    if (accept) {
        description = "Your test ("+ testName+") has been accepted to public.";
        writeNewNotification(userID, description, "Notification");
        await testModel.setValid(testID);
    }
    else {
        description = "Your test ("+ testName+") has been denied to public.";
        writeNewNotification(userID, description, "Notification Fail");
    }
   
    res.json(await testModel.getTestListInValid())
})
module.exports = router;