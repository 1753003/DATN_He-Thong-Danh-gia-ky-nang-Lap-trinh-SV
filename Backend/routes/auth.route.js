const express = require('express');
const router = express.Router();

var firebase = require("firebase/app");
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

router.post('/', async function (req, res) {
    firebase.auth().createUserWithEmailAndPassword(req.body.email, req.body.password)
        .then((userCredential) => {
        // Signed in 
        var user = userCredential.user;
        res.json(user);
        // ...
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        res.json(errorMessage);
    // ..
  });
})

module.exports = router;