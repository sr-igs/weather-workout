const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const { DateTime } = require("luxon");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html")
})

app.post("/results", function(req, res) {
  let outdoorDays = Number(req.body.outdoor); //Number of outdoor workout days from the request
  let indoorDays = Number(req.body.indoor); //Number of indoor workout days from the request

  //Need to add code to detect the checkboxes. Challenge is that if checkbox is not marked it won't submit a value to the server!!!
  let dayPreference = {monday:false,tuesday:false,wednesday:false,thursday:false,friday:false,saturday:false,sunday:false};
  if(typeof(req.body.mondayCB)!=="undefined"){dayPreference.monday=true};
  if(typeof(req.body.tuesdayCB)!=="undefined"){dayPreference.tuesday=true};
  if(typeof(req.body.wednesdayCB)!=="undefined"){dayPreference.wednesday=true};
  if(typeof(req.body.thursdayCB)!=="undefined"){dayPreference.thursday=true};
  if(typeof(req.body.fridayCB)!=="undefined"){dayPreference.friday=true};
  if(typeof(req.body.saturdayCB)!=="undefined"){dayPreference.saturday=true};
  if(typeof(req.body.sundayCB)!=="undefined"){dayPreference.sunday=true};
  console.log(dayPreference);

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
      doWeatherCalcs(dailyData,indoorDays,outdoorDays,dayPreference);
      res.sendFile(__dirname + "/result.html")
    });
  });
})

app.post("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
})

app.listen(port, function() {
  console.log(`App is running in port ${port}`)
})

function doWeatherCalcs(data,indoor,outdoor,dayPreference) {
  let weatherOutput={
    description:"",
  };
  let dateStamps = [];
  let weatherPoints = [];
  for(var i=0;i<data.length-1;i++){ //Removing last day as it is repetition of current day
    //dateStamps array will contain 1-7 indicating Monday to Sunday, uses Luxon for time stamp management.
    dateStamps.push(DateTime.fromSeconds(Number(data[i].dt)).weekday);
    //Gets the weather string
    weatherPoints.push(data[i].weather[0].main);
    //FUTURE: Get weather icon too!
  };
  console.log(dateStamps);
  console.log(weatherPoints);
  let rainDays = 0;
  //Count how many rainy days - there probably is a better way of doing this.
  weatherPoints.forEach(function(w){
    if(w.includes("Rain")){rainDays++};
  });

  //1) In the days prefered, first add indoor workouts for any rainy days
  //2) In the days prefered, then add outdoor workouts for any non-rainy days
  //3) If all days have not been covered, then add other days randomly, prioritisign week days.

};
