const express = require('express');
const router = express.Router();
var jwt = require('jsonwebtoken');
var firebase = require("firebase/app");
const userModel = require('../models/user.model');
require("firebase/auth");

const firebaseConfig = {
    apiKey: "AIzaSyC_FKi-svb2idZpvqsfPFWASeHUS60O9eU",
    authDomain: "devcheckpro.firebaseapp.com",
    projectId: "devcheckpro",
    storageBucket: "devcheckpro.appspot.com",
    messagingSenderId: "594608048066",
    appId: "1:594608048066:web:fe4fadd828cdc36181f85b",
    measurementId: "G-44GFLD429W"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

router.post('/signup', async function (req, res) {
    firebase.auth().createUserWithEmailAndPassword(req.body.email, req.body.password)
        .then(async (userCredential) => {
        // Signed in 
        var user = userCredential.user;
        var refreshToken = jwt.sign(
          {
            uid: user.uid
          }, 
          'secretkeyRefresh', 
          {
            expiresIn: "3000s"
          });
        var type = req.body.type;
        var result;
        if (type === "developer")
          result =  await userModel.createUserDeveloper(user.uid, refreshToken, req.body.email, req.body.password);
        else if (type === "creator") 
          result =  await userModel.createUserCreator(user.uid, refreshToken, req.body.email, req.body.password)
        else
          result = "Incorrect Type of User"
        res.json(result);
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        res.json(errorMessage);
  });
})

router.post('/confirmEmail', async function (req, res) {
  var nodemailer = require('nodemailer');
  const email = req.body.email;

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'group7.17clc@gmail.com',
      pass: 'group7.17clc'
    }
  });

  var uid = await userModel.getByEmail(req.body.email);

  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < 6; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  userModel.updateCode(uid.UserID,result);
  console.log(uid.UserID);
  var mailOptions = {
    from: 'group7.17clc@gmail.com',
    to: req.body.email,
    subject: 'DevCheck team - Confirm your email',
    html: `<h2>Confirm your email on DevCheck website!</h2> 
    <p>Here are your code to confirm your email: ${result}</p>
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

router.post('/confirmCode', async function (req, res) {
  
})
router.post('/login', async function (req, res) {  
  const email = req.body.email;
  const password = req.body.password;

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      var accessToken = jwt.sign(
        {
          uid: user.uid
        }, 
        'secretkeyy', 
        {
          expiresIn: "300s"
        });
      var refreshToken = jwt.sign(
        {
          uid: user.uid
        },
        'secretkeyy',
        {
          expiresIn: "30000s"
        }
      );

      userModel.updateRefreshToken(user.uid, refreshToken);
      res.json({
        accessToken: accessToken,
        refreshToken: refreshToken,
        type: 'developer'
      })
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      res.status(204).json(error.message);
    });
  
  
})

module.exports = router;