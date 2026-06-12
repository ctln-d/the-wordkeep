require('dotenv').config();
require("./config/db");
const path = require('path');
const express = require("express");
const cors = require("cors");
const axios = require("axios");


const app = express()
app.use(cors())
app.use(express.json());

const port = 3001

// definitions
app.get("/define", async (req, res) => {
    const word = req.query.word

    if (!word) {
        return res.status(400).json({error: "Word is required"})
    }

    try {
        const response = await axios.get(
            `https://dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${process.env.MERRIAM_KEY}`
        )

        const data = response.data

        // suggestions (array of strings)
        if (typeof data[0] == "string") {
            return res.json({
                type: "suggestions",
                suggestions: data
            })
        }

        // def entry
        const entry = data[0]             // first def?

        if (!entry?.meta?.id || !entry?.shortdef) {
            return res.status(404).json({
                error: "No valid definition found"
            })
        }

        res.json({
            type: "definition",
            word: entry.meta.id.split(":")[0],
            partOfSpeech: entry.fl,
            definitions: entry.shortdef
        })
    } catch (error) {
        res.status(500).json({error: "API request failed"})
    }
})

// auth
const UserRouter = require("./api/user");
app.use("/user", UserRouter);

// pages           **change everything to async/await
const PagesRouter = require("./api/pages");
app.use("/pages", PagesRouter);

// serve built frontend files
app.use(express.static(path.join(__dirname, '../frontend/dist')))

// any route that isn't an API route sends the frontend
app.get('/{*path}', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'))
})


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})
