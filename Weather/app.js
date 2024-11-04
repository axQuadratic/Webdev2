const express = require("express");
const app = express();
const PORT = 8181

app.use(express.static("public"));
app.use(express.urlencoded({ extended : false }));
app.use(express.json());
app.set("view engine", "pug")

app.get("/", function(req, res) { 
    res.redirect("/dog");
});

app.get("/dog", function(req, res) {
    let data = {
        title: "Pug (dog)",
        lines:  [
            "A pug is an abomination of selected breeding created by horrible people for horrible purposes.",
            "Etc."
        ],
        image: "dog.png",
        other: "lang"
    }
    
    res.render("index", data)
});

app.get("/lang", function(req, res) {
    let data = {
        title: "Pug (language)",
        lines:  [
            "Pug is a templating engine which is better than HTML.",
            "bottom text"
        ],
        image: "eng.png",
        other: "dog"
    }

    res.render("index", data)
});

app.listen(PORT, function() {
    console.log("NGO Weather Services active; ready for requests at " + PORT)
});