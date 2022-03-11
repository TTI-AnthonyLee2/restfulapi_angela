const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB", {useNewUrlParser: true});

const articleSchema = {
    title: String,
    content: String,
}

const Article = mongoose.model("Article", articleSchema);

// RESTful API demonstartion
// Read
app.get("/articles", (req, res) => {
    Article.find({}, (err, foundArticles) => {
        res.send(err || foundArticles);
    });
});

app.listen(3000, () => {
    console.log("Server is opening on port 3000.");
});