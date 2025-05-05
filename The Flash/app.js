const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const sql = require("./sql");
const PORT = 8181;

const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "pug");

const db = new sqlite3.Database("flash.db");
db.run("PRAGMA foreign_keys = ON");

db.parallelize(function() {
    db.all(sql.createCollectionTable(), function(err, row) {
        if (err) console.error(err.message);
    });
    db.all(sql.createCardTable(), function(err, row) {
        if (err) console.error(err.message);
    });
});

/*db.serialize(function() {
    db.all("DELETE FROM cards");
    db.all("DELETE FROM collections");
    db.all(sql.createCollection(), ["Lore of Hush House", "The Librarian"]);
    db.all(sql.createCard(), [1, "Who originally acknowledged the Necessity of Endings, and where?", "Julian Coseley, in the Six Letters on Necessity"]);
    db.all(sql.createCard(), [1, "True or False: the Moth is one of the Hours which favour History over Eternity.", "True"]);
});*/

app.get("/", function(req, res) {
    db.serialize(function() {
        db.all(sql.getAllCollections(), function(err, collections) {
            if (err) console.error(err.message);

            res.render("index.pug", { collections: collections });
        });
    });
});

app.get("/add", function(req, res) {
    res.render("add.pug");
});

app.post("/createcollection", function(req, res) {
    console.log(req.body);
    db.serialize(function() {
        db.all(sql.getAllCollections(), function(err, collections) {
            if (err) console.error(err);

            if (!collections.includes(req.body.name)) {
                db.all(sql.createCollection(), [req.body.name, req.body.author], function(err) {
                    if (err) console.error(err);

                    db.all(sql.getCollectionByName(), [req.body.name], function(err, collection) {
                        if (err) console.error(err);

                        for (const card of req.body.cards) {
                            db.all(sql.createCard(), [collection[0].collection_id, card.front, card.back], function(err) {
                                if (err) console.error(err);
                            });
                        }

                        res.sendStatus(200);
                    });
                });
            }
            else {
                db.all(sql.getCollectionByName(), [req.body.name], function(err, collection) {
                    if (err) console.error(err);

                    for (const card of req.body.cards) {
                        db.all(sql.createCard(), [collection.collection_id, card.front, card.back], function(err) {
                            if (err) console.error(err);

                            res.sendStatus(200);
                        });
                    }
                });
            }
        });
    });
});

app.get("/:collection", function(req, res) {
    console.log(req.params.collection);
    console.log(typeof(req.params.collection));

    db.serialize(function() {
        db.all(sql.getCollectionById(), req.params.collection, function(err, collection) {
            if (err) console.error(err.message);

            db.all(sql.getCardsByCollection(), req.params.collection, function(err, cards) {
                if (err) console.error(err.message);
                
                console.log(cards);

                let shuffledCards = [];
                let cardLength = cards.length;
                for (let i = 0; i < cardLength; i++) {
                    let randomIndex = Math.floor(Math.random() * cards.length);

                    shuffledCards.push(cards.pop(randomIndex));
                }

                res.render("cardview.pug", { collection: collection[0], cards: shuffledCards });
            });
        });
    });
});

app.listen(PORT, function() {
    console.log("Launching flash database server on port " + PORT);
});