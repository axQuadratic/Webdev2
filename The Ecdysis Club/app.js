const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const sql = require('mysql2');
const PORT = 8181;

const connection = sql.createConnection({
    host: "localhost",
    user: "admin",
    password: "qwe123!!",
    database:"dbo"
});

connection.connect();

app.use(express.static('public'));
app.set("view engine", "pug");
app.set("query parser", "extended")
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get("/", function(req, res) {
    connection.promise().query("SELECT * FROM dbo.food")
    .then(function([rows, fields]) {
        res.render("menu.pug", {"items": rows});
    })
    .catch(function() { res.sendStatus(500) });
});

app.get("/cart", function(req, res) {
    res.render("cart.pug");
});

app.get("/admin", function(req, res) {
    let password = req.query.password;
    if (password === "thebellsofys")
        res.render("admin.pug");
    else if (password === "" || password === undefined)
        res.render("login.pug", {"password_entered": false});
    else
        res.render("login.pug", {"password_entered": true});
});

app.post("/add", function(req, res) {
    let items = req.body;
    connection.promise().query("INSERT INTO dbo.food (category, name, price, image_path, description) " +
        `VALUES ('${items.category}', '${items.name}', ${items.price}, '${items.image_path}', '${items.description}')`);
});

app.listen(PORT, function() {
    console.log("IN GIRUM IMUS NOCTE ET CONSUMIMIR IGNI // Port 8181")
});