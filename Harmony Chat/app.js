const express = require('express');
const app = express();
const cors = require('cors');
const sql = require('mysql2')
const bodyParser = require('body-parser');
const PORT = 8181;

const connection = sql.createConnection({
    host: "localhost",
    user: "admin",
    password: "qwe123!!",
    database:"dbo"
});

connection.connect();

app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", function(req, res) {
    res.sendFile("public/index.html", { root: __dirname });
});

app.get("/messages/", function(req, res) {
    connection.promise().query('SELECT * FROM messages') 
    .then(function([rows, fields]) {
        res.send(rows)
    })
    .catch(function() { res.sendStatus(500) });
});

app.listen(PORT, function() {
    console.log(`Harmony Chat(TM) ready; serving on port ${PORT}...`)
});