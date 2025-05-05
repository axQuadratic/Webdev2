const sql = require("./sql");
const express = require("express");
const PORT = 8181;

const app = express();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "pug");

app.get("/", function(req, res) {
    res.redirect("/config");
});

app.get("/config", function(req, res) {
    res.render("config.pug");
});

app.listen(PORT, function() {
    console.log("Compatibility Tester ONLINE on port " + PORT);
});

sql.initDatabase();