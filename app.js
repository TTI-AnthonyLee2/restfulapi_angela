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

// Model
const Article = mongoose.model("Article", articleSchema);

// RESTful API demonstartion

// chained route handlers using Express
app.route("/articles")
    // Read
    .get((req, res) => {
        Article.find({}, (err, foundArticles) => {
            res.send(err || foundArticles);
        });
    })
    // Create
    .post((req, res) => {
        const title = req.body.title;
        const content = req.body.content;
        
        // Method 1
        const newArticle = new Article({
            title: title,
            content: content,
        });
    
        newArticle.save(err => {
            res.send(err || "Successfully added a new article!");
        });
    
        // Method 2
        // Article.insertMany([{title: title, content: content}], err => {
        //     res.send(err || "Successfully added a new article!");
        // });
    
        // Method 3
        // Article.create({title: title, content: content}, (err, article) => {
        //     res.send(err || "Successfully added a new article!");
        // });
    
    })
    // Delete
    .delete((req, res) => {
        Article.deleteMany({}, err => {
            res.send(err || `Successfully deleted all articles!`);
        });
    });

app.listen(3000, () => {
    console.log("Server is opening on port 3000.");
});