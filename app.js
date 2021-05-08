const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.listen(port,function(){
  console.log(`App is running in port ${port}`)
})
