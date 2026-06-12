const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PagesSchema = new Schema({
    userId: mongoose.Schema.Types.ObjectId,
    pages: Array
});

const Pages = mongoose.model("Pages", PagesSchema);

module.exports = Pages;