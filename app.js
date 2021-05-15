const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const workoutCalc = require(__dirname+"/workoutCalc.js")

const app = express();
const port = 3000;

//appResults will be the output of the calculation, and will be passed to the EJS as an object
let appResults = {
  firstDay:["Monday","Indoor"],
  secondDay:["Monday","Indoor"],
  thirdDay:["Monday","Indoor"],
  fourthDay:["Monday","Indoor"],
  fifthDay:["Monday","Indoor"],
  sixthDay:["Monday","Indoor"],
  seventhDay:["Monday","Indoor"]
}

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));
app.set('view engine','ejs');

app.get("/", function(req, res) {
  res.render("index");
});

app.get("/results",function(req,res){
  res.render("results",appResults);
})

app.post("/results", function(req, res) {

//MUST REFACTOR THE BELOW!!!!
  const apiKey = "dde13eb089b8230fcc731404f219fa4d"; //apikey for openweatherv  - This will have to go in a private file that doesn't get uploaded to git
  let lat = 51.7527;
  let lon = -0.336;
  const units = "metric";
  const exclude = "minutely";
  let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${exclude}&appid=${apiKey}`;
  //Sending API request
  https.get(url, function(response) {
    const chunks = []; //Will hold the JSON information until all the requestss are IOBjI7aAzPcEZeedi5yW5f2yOq55WWLwNGmvvx4Um1vskeMj0
    console.log(response.statusCode);
    //Catering for multiple responses
    response.on("data", function(chunk) {
      chunks.push(chunk);
    });
    //Concatenating all responses
    response.on("end", function() {
      const rawData = Buffer.concat(chunks);
      var weatherData = JSON.parse(rawData);
      //console.log(weatherData);
      var hourlyData = weatherData.hourly;
      var dailyData = weatherData.daily;
      appResults = workoutCalc.doCalcs(req.body,dailyData);
      res.redirect("/results")
    });
  });
})

app.post("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
})

app.listen(port, function() {
  console.log(`App is running in port ${port}`)
})
