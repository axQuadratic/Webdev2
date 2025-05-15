const sql = require("./sql");
const express = require("express");
const pug = require("pug");
const PORT = 8181;

const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "pug");

let components = {};

app.get("/", function(req, res) {
    res.redirect("/config");
});

app.get("/config", async function(req, res) {
    res.render("config.pug", { components: components });
});

app.post("/render/:page", function(req, res) {
    req.body.components = components;
    res.send(pug.renderFile("views/popups/" + req.params.page + ".pug", req.body));
});

app.listen(PORT, async function() {
    await sql.initDatabase();
    components = await sql.getAllComponents();

    console.log("Compatibility Tester ONLINE on port " + PORT);
});

sql.initDatabase();