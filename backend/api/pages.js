const express = require("express");
const router = express.Router();

const Pages = require("../models/Pages");

// GET
router.get("/getPages", (req, res) => {
   const userId = req.query.userId;

   Pages.findOne({ userId })
       .then(data => {
           return res.json({
               status: "SUCCESS",
               pages: data?.pages || []
           });
       }).catch(err => {
           console.log(err);
           return res.json({
               status: "FAILED",
               message: "An error occurred while fetching pages"
           });
   });
});

// POST
router.post("/savePages", (req, res) => {
   const { userId, pages } = req.body;

   Pages.findOneAndUpdate(
       { userId },
       { pages },
       { upsert: true, new: true }
   ).then(() => {
       return res.json({ status: "SUCCESS"});
   }).catch(err => {
       console.log(err)
       return res.json({
           status: "FAILED",
           message: "An error occurred when updating pages"
       })
   })
});

module.exports = router;