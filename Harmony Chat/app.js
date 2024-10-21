const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors');
const sql = require('mysql2')
const PORT = 8181;

const connection = sql.createConnection({
    host: "localhost",
    user: "admin",
    password: "qwe123!!",
    database:"dbo"
});

connection.connect();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use(cors());

app.get("/", function(req, res) {
    res.sendFile("public/index.html", { root: __dirname });
});

app.get("/getmessage/", function(req, res) {
    connection.promise().query('SELECT * FROM messages') 
    .then(function([rows, fields]) {
        res.send(rows)
    })
    .catch(function() { res.sendStatus(500) });
});

app.post("/sendmessage/", function(req, res) {
    let timestamp = Math.floor(Date.now() / 1000)
    connection.promise().query(`INSERT INTO messages (message, username, time) VALUES ('${req.body.message}', '${req.body.username}', ${timestamp})`)
    .then(function([rows, fields]) {
        res.sendStatus(200);
    })
    .catch(function(e) { console.log(e); res.sendStatus(500); });
});

app.post("/reset/", function(req, res){
    if (req.body.password != "qwe123!!"){
        res.sendStatus(451);  
        return;
    } 
    connection.promise().query("TRUNCATE TABLE messages")
    .then(function([rows, fields]){
        res.sendStatus(200);
    });
});

app.listen(PORT, function() {
    console.log(`Harmony Chat(TM) ready; serving on port ${PORT}...`)
});