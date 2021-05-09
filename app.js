const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  const apiKey = "dde13eb089b8230fcc731404f219fa4d"; //apikey for openweather
  let lat = 51.7527;
  let lon =  -0.336;
  const units = "metric";
  const exclude = "minutely";
  let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${exclude}&appid=${apiKey}`;
  https.get(url,function(response){
    console.log(response.statusCode);
    response.on("data",function(data){
      const weatherData = JSON.parse(data);
      console.log(weatherData);
      //By this point we are already getting the weather data for the chosen coordinates
    });

  });
})

app.listen(port,function(){
  console.log(`App is running in port ${port}`)
})
