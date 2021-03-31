const express = require("express");
const router = express.Router();
var jwt = require("jsonwebtoken");

const userModel = require("../models/user.model");
router.get("/", async function (req, res) {
  console.log(req.refreshToken);
  if (req.refreshToken) {
    const list = await userModel.getAll();
    const decoded = jwt.verify(req.refreshToken, "secretkeyy", {
      ignoreExpiration: true,
    });
    var check = false;
    list.forEach((item) => {
      if (
        item.UserID == decoded.uid &&
        item.RefreshToken == req.refreshToken
      ) {
        check = true;
      }
    });
    if (check) {
      var accessToken = jwt.sign(
        {
          uid: decoded.uid,
        },
        "secretkeyy",
        {
          expiresIn: "10s",
        }
      );
      var refreshToken = jwt.sign(
        {
          uid: decoded.uid,
        },
        "secretkeyy",
        {
          expiresIn: "10s",
        }
      );
      res.json({ message: "New 2 tokens", data: {accessToken: accessToken, refreshToken: refreshToken} });
    }
    else 
    res.json({message: "Wrong refresh token"});
  }
});

module.exports = router;
