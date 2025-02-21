const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const jwt = require("jsonwebtoken");
const sql = require("./sql");
const PORT = 8181;

const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "pug");

const db = new sqlite3.Database('gateofhorn.db');
db.run("PRAGMA foreign_keys = ON;");

// Insert arbitrary one-off database functions here
/*
db.serialize(function() {
    db.all(sql.createPost(), [2, 3, "Banned. Thread locked. Discussion on Coseley is not permitted under any circumstances.", "05-12-1937"],
        function(err, row) {
        if (err) console.error(err.message);
    });
});
*/

db.serialize(function() {
    db.all(sql.createUserTable(), function(err, row) {
        if (err) console.error(err.message);
    });

    db.all(sql.createCategoryTable(), function(err, row) {
        if (err) console.error(err.message);
    });
    
    db.all(sql.createThreadTable(), function(err, row) {
        if (err) console.error(err.message);
    });

    db.all(sql.createPostTable(), function(err, row) {
        if (err) console.error(err.message);
    });
});

app.get("/", function(req, res) {
    res.redirect("/home");
});

app.get("/home", function(req, res) {
    db.serialize(function() {
        db.all(sql.getCategories(), function(err, row) {
            if (err) {
                console.error(err.message);
            }

            res.render("index.pug", {categories: row});
        });
    });
});

app.get("/category/:catid", function(req, res) {
    db.serialize(function() {
        db.all(sql.getAllThreads(), function(err, row) {
            if (err) {
                console.error(err.message);
            }

            db.all(sql.getCategoryById(), [req.params.catid], function(err, row2) {
                if (err) {
                    console.error(err.message);
                }
    
                res.render("category.pug", {threads: row, category: row2[0]})
            });
        });
    });
});

app.get("/category/:catid/thread/:threadid", function(req, res) {
    db.serialize(function() {
        db.all(sql.getCategoryById(), [req.params.catid], function(err, row) {
            if (err) {
                console.error(err.message);
            }

            db.all(sql.getThreadById(), [req.params.threadid], function(err, row2) {
                if (err) {
                    console.error(err.message);
                }

                db.all(sql.getAllPosts(), function(err, row3) {
                    if (err) {
                        console.error(err.message);
                    }

                    res.render("thread.pug", {category: row[0], thread: row2[0], posts: row3});
                });
            });
        });
    });
});

app.get("/members", function(req, res) {
    db.serialize(function() {
        db.all(sql.getAllUsers(), function(err, row) {
            if (err) {
                console.error(err.message);
            }

            res.render("members.pug", {members: row});  
        });
    })
});

app.get("/createaccount", function(req, res) {
    res.render("account-creation.pug");
});

app.post("/ghirbi", function(req, res) {
    switch (req.body.operation) {
        case "newuser":
            let currentTime = new Date();
            let timeString = `${currentTime.getFullYear()}-${currentTime.getMonth()}-${currentTime.getDate()} ${currentTime.getHours()}:${currentTime.getMinutes()}`;
            db.serialize(function() {
                db.all(sql.createUser(), [req.body.username, req.body.password, timeString, null, null], function(err, row) {
                    if (err) console.log(err);
                    console.log(row);
                });
            });

            break;
    
        default:
            
            break;
    }
});

app.listen(PORT, function() {
    console.log("The Heart Relentless beats once more to protect the skin of the server we understand.");
});