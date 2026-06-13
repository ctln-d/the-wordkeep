const express = require("express");
const router = express.Router();

const Pages = require("../models/Pages");

// add word
router.post("/addWord", (req, res) => {
    const { userId, newWord } = req.body;

    Pages.findOne({
        userId,
        pages: {
            $elemMatch: {
                words: {
                    $elemMatch: {
                        word: newWord.word
                    }
                }
            }
        }
    }).then(existing => {
        if (existing) {
            return res.json({
                status: "FAILED",
                message: "You saved this word already"
            })
        }

        return Pages.findOne({ userId });
    }).then(userPages => {
        if (!userPages) {
            userPages = newPages ({
                userId,
                pages: [
                    { id: 1, words: [] },
                    { id: 2, words: [] }
                ]
            });
        }

        const newPages = userPages.pages;

        const lastFullPage = newPages[newPages.length - 2];
        const lastPage = newPages[newPages.length - 1];

        if (lastFullPage.words.length < 13) {
            lastFullPage.words.push(newWord);
        } else if (lastPage.words.length < 13) {
            lastPage.words.push(newWord);
        } else {
            newPages.push({
                id: newPages.length + 1,
                words: [newWord]
            });

            newPages.push({
                id: newPages.length + 1,
                words: []
            });
        }

        userPages.pages = newPages;
        return userPages.save();
    }).then (saved => {
        return res.json({
            status: "SUCCESS",
            pages: saved.pages
        });
    }).catch(err => {
        console.log(err);
        return res.json({ status: "FAILED" });
    });
});

// save word
router.post("/saveWord", (req, res) => {
    const { userId, wordId, source, notes } = req.body;

    Pages.updateOne(
        { userId },
        {
            $set: {
                "pages.$[].words.$[w].userInputs.source": source,
                "pages.$[].words.$[w].userInputs.notes": notes
            }
        },
        {
            arrayFilters: [
                { "w.id": wordId }
            ]
        }
    ).then(result => {
        return res.json({ status: "SUCCESS", result });
    }).catch(err => {
        console.log(err);
        return res.json({ status: "FAILED" });
    });
});

// GET
router.get("/getPages", (req, res) => {
   const userId = req.query.userId;

   console.log("GET USER ID:", userId);

   Pages.findOne({ userId })
       .then(data => {
           console.log("GET RESULT:", data);
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

   console.log("SAVE USER ID:", userId);

   Pages.findOneAndUpdate(
       { userId },
       { pages },
       { upsert: true, new: true }
   ).then(result => {
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