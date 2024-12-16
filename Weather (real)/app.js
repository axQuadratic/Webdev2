const express = require('express');
const request = require('request');
const app = express();

app.use(express.static('public'));
app.set('view engine', 'pug');

const PORT = 8181;
const KEY = '81cb7c56b50f14d388d6ce9e78ac1ee1'
const LAT = '63.1793655';
const LON = '14.6357061';
const URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&appid=${KEY}`

let weather = null;

app.get("/", function(req, res) {
    request(URL, function(err, req_res, body) {
        if (err) {
            console.log("Something has gone horribly wrong: ", err);
        } else {

            weather = JSON.parse(body);
            
            completed = true;

            let weathers = weather["list"];
            let weather_list = [];

            let last_date = weathers[0]["dt_txt"].split(" ")[0];
            let day_weather = {};
            weathers.forEach(instance => {
                if (instance["dt_txt"].split(" ")[0] != last_date) {
                    last_date = instance["dt_txt"].split(" ")[0];
                    weather_list.push(day_weather);
                    day_weather = {};
                }
                day_weather[instance["dt_txt"].split(" ")] = instance;
            });

            res.render("index", {weather: weather_list});
        }
    });
});

app.get("/debug/api", function(req, res) {
    res.send(weather);
});

app.listen(PORT, function() {
    console.log(`IN GIRUM IMUS NOCTE ET CONSUMIMIR IGNI // Port ${PORT}`)
});