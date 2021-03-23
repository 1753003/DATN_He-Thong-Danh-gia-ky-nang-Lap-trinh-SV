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
    const userByEmail = await userModel.getByEmail(req.body.email);
    firebase.auth().createUserWithEmailAndPassword(req.body.email, req.body.password)
        .then(async (userCredential) => {
        // Signed in 
        var user = userCredential.user;
        user.sendEmailVerification().then(function() {
          // Email sent.
        }).catch(function(error) {
          // An error happened.
        });
        var type = req.body.type;
        var result;
        if (type === "developer")
          result = await userModel.createUserDeveloper(user.uid, req.body.email, "developer", "not active");
        else if (type === "creator") 
          result = await userModel.createUserCreator(user.uid, req.body.email, "creator", "not active")
        else
          result = "Incorrect Type of User"
        res.json({
          status: 'Ok',
          uid: result
        });

        user.sendEmailVerification().then(function() {
  // Email sent.
}).catch(function(error) {
  // An error happened.
});
    })
    .catch(async (error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage)
        console.log(userByEmail)
        if (errorCode === 'auth/email-already-in-use')
        {         
          if (userByEmail.UserStatus === 'not active')
            res.json({
              status: 'Ok',
              uid: userByEmail.UserID
            })
        }
        res.json({
          status: 'Fail',
          message: errorMessage
        });
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
  await userModel.updateCode(uid.UserID,result);
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
  const uid = req.body.uid;

  const user = await userModel.getByUID(uid);

  if (user.Code === req.body.code) {
    await userModel.updateStatus(uid, 'active');
    res.json({
      codeMessage: 'OK'
    })
  }
  else
    res.json({
      codeMessage: 'FAIL'
    })
})

router.post('/login', async function (req, res) {  
  const email = req.body.email;
  const password = req.body.password;
  
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(async (userCredential) => {
      // Signed in
      
      var user = userCredential.user;
      console.log(user);
      const temp = await userModel.getByUID(user.uid);
      if (!user.emailVerified)
        res.json({
          status: "error",
          message: "Your email is not confirmed, please confirm"
        })
      else if (temp.UserStatus === 'lock') {

      }
      else if (user.emailVerified) {
        var accessToken = jwt.sign(
          {
            uid: user.uid,
            type: temp.UserType
          }, 
          'secretkeyy', 
          {
            expiresIn: "1d",
          });
        var refreshToken = jwt.sign(
          {
            uid: user.uid,
            type: temp.UserType
          },
          'secretkeyy',
          {
            expiresIn: "10s"
          }
        );
        
        userModel.updateRefreshToken(user.uid, refreshToken);
        res.json({
          status: 'OK',
          message: {
            accessToken: accessToken,
            refreshToken: refreshToken,
            type: temp.UserType
          }
        })
      }
    })
    .catch((error) => {
      console.log(error.message);
      var errorCode = error.code;
      var errorMessage = error.message;
      res.json({
        status: "error",
        message: errorMessage
      });
    });
  
  
})

router.post('/loginFacebook', async function (req, res) {  
  const uid = req.body.UserID;
  const user = await userModel.getByUID(uid);
  var accessToken = jwt.sign(
    {
      uid: uid
    }, 
    'secretkeyy', 
    {
      expiresIn: "300s"
    });
  var refreshToken = jwt.sign(
    {
      uid: uid
    },
    'secretkeyy',
    {
      expiresIn: "1d"
    }
  );

  if (user == null || user == undefined)
  {
    const type = req.body.UserType
    if (type === "developer")
      await userModel.createUserDeveloper(uid, refreshToken, req.body.DevMail, "FB");
    else if (type === "creator") 
      await userModel.createUserCreator(uid, refreshToken, req.body.DevMail, "FB");
  
  }

  const result = {
    accessToken: accessToken,
    refreshToken: refreshToken,
    type: req.body.UserType
  }

  res.json(result);
})

router.post('/loginGoogle', async function (req, res) {  
  const uid = req.body.UserID;
  const user = await userModel.getByUID(uid);
  
  var accessToken = jwt.sign(
    {
      uid: uid
    }, 
    'secretkeyy', 
    {
      expiresIn: "300s"
  });

  var refreshToken = jwt.sign(
    {
      uid: uid
    },
    'secretkeyy',
    {
      expiresIn: "1d"
    }
  );
  var result;
  if (user == null || user == undefined)
  {
    const type = req.body.UserType
    if (type === "developer")
      await userModel.createUserDeveloper(uid, req.body.DevMail, "developer", "active");
    else if (type === "creator") 
      await userModel.createUserCreator(uid, refreshToken, req.body.DevMail, "GM");
    result = {
      status: "OK",
      message: {
        accessToken: accessToken,
        refreshToken: refreshToken,
        type: req.body.UserType
      }
    }
  }
  else if (user.UserStatus === 'lock')
    result = {
      status: "error",
      message: "Your email has been locked, please contact admin for more."
    }
  else if (user.UserStatus === 'active')
  result = {
    status: "OK",
    message: {
      accessToken: accessToken,
      refreshToken: refreshToken,
      type: req.body.UserType
    }
  }

  res.json(result);
})


router.post('/refreshToken', async function(req, res) {
  if (req.body.refreshToken) {
    const list = await userModel.getAll();
    try 
    {
      const decoded = jwt.verify(req.body.refreshToken, 'secretkeyy');
      var check = false;
      list.forEach(item => {
        if (item.UserID == decoded.uid && item.RefreshToken == req.body.refreshToken)
        {
          check = true;
        }
      })
      if (check === true) {
        var accessToken = jwt.sign(
          {
            uid: decoded.uid
          }, 
          'secretkeyy', 
          {
            expiresIn: "300s"
          });
        res.json({accessToken: accessToken});
      } else
      res.json({
        message: "Wrong refresh token"
      })
    } catch (err) {
      const decoded = jwt.verify(req.body.refreshToken, 'secretkeyy', {ignoreExpiration: true});
      var check = false;
      list.forEach(item => {
        if (item.UserID == decoded.uid && item.RefreshToken == req.body.refreshToken)
        {
          check = true;
        }
      })
      if (check) {
        var accessToken = jwt.sign(
          {
            uid: decoded.uid
          }, 
          'secretkeyy', 
          {
            expiresIn: "300s"
          });
        var accessToken = jwt.sign(
          {
            uid: decoded.uid
          }, 
          'secretkeyy', 
          {
            expiresIn: "1d"
          });
        res.json({accessToken: accessToken, refreshToken: refreshToken});
      }
      res.json('Wrong refresh token')
    }
  }
})

router.post('/forgotPassword', async function (req, res) {
  const email = req.body.email;
  var auth = firebase.auth();
  auth.sendPasswordResetEmail(email).then(function() {
    // Email sent.
    res.json({
      status: 'OK'
    })
  }).catch(function(error) {
    console.log(error);
    res.json({
      status: 'Error',
      message: error.message
    })
  });
})
module.exports = router;