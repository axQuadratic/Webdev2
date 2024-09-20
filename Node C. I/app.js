const express = require('express');
const app = express();
const cors = require('cors');
const sql = require('mysql2')
const bodyParser = require('body-parser');
const PORT = 8181;

const connection = sql.createConnection({
    host: 'localhost',
    user: 'admin',
    password: 'qwe123!!',
    database:"dbo"
});

connection.connect()

let message = "";

app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.sendFile('public/index.html', { root: __dirname });
});

app.get('/video', function(req, res) {
    res.sendFile('public/assets/Shrek.The.Third.(2007).480p.Dual.Audio.(Hin-Eng).[MoviesFlix.in].mp4', { root: __dirname });
});

app.route('/message')
    .get(function(req, res) {
        console.log("Retrieving saved message...")
        res.send(message)
    })

    .post(function(req, res) {
        message = req.body['message'];
        console.log(`Saved message set to ${message}`)
        res.sendStatus(200);
    });

app.get('/getdatabase', function(req, res) {
    let databaseStatus = []
    connection
    .promise()
    .query('SELECT * FROM towers') 
    .then(function([rows, fields]) {
        databaseStatus = rows;

        let html = "<table>\n<tr><th>ID</th><th>Name</th><th>Age</th><th>Destroyed?</th><th>Angle on Ground</th></tr>"
        for (let i = 0; i < databaseStatus.length; i++) {
            html += "<tr>"
            html += "<td>" + databaseStatus[i].id + "</td>"
            html += "<td>" + databaseStatus[i].name + "</td>"
            html += "<td>" + databaseStatus[i].age + " years</td>"
            html += "<td>" + Boolean(databaseStatus[i].destroyed) + "</td>"
            html += "<td>" + databaseStatus[i].angle_on_ground + " degrees</td>"
            html += "</tr>"
        }
        res.send(html)
    })
})

app.listen(PORT, function() {
    console.log(`Systems online, listening on port ${PORT}`);
});
