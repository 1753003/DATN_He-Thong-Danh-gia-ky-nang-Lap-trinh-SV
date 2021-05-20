const express = require("express");
const router = express.Router();

const session = require("../models/session.model");

router.post("/", async function (req, res) {
  await session.postSession(req.uid, req.body.TestID, req.body.Timed)
  res.json('OK');
});

router.post("/check", async function (req, res) {
    const result = await session.checkSession(req.uid, req.body.TestID, req.body.Timed);
    if (result != null)
        res.json({
            check: true,
            timed: result
        })
    else   
        res.json({
            check: false,
            timed: result
        })
})

router.delete("/:TestID", async function (req, res) {
    await session.deleteSession(req.uid, req.params.TestID);
    res.json("OK")
})
module.exports = router;
