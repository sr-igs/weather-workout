exports.doCalcs = function(userReq, weatherData) {
  //userReq will be the req.body
  let outdoorDays = Number(userReq.outdoor); //Number of outdoor workout days from the request
  let indoorDays = Number(userReq.indoor); //Number of indoor workout days from the request
  console.log("Outdoor" + outdoorDays);
  console.log("Indoor:" + indoorDays);

  //Need to add code to detect the checkboxes. Challenge is that if checkbox is not marked it won't submit a value to the server!!!
  //dayPreference array linked to day of the week - item 0 is sunday, etc.
  let dayPreference = [false, false, false, false, false, false, false]

  if (typeof(userReq.sundayCB) !== "undefined") {
    dayPreference[0] = true;
  };
  if (typeof(userReq.mondayCB) !== "undefined") {
    dayPreference[1] = true;
  };
  if (typeof(userReq.tuesdayCB) !== "undefined") {
    dayPreference[2] = true;
  };
  if (typeof(userReq.wednesdayCB) !== "undefined") {
    dayPreference[3] = true;
  };
  if (typeof(userReq.thursdayCB) !== "undefined") {
    dayPreference[4] = true;
  };
  if (typeof(userReq.fridayCB) !== "undefined") {
    dayPreference[5] = true;
  };
  if (typeof(userReq.saturdayCB) !== "undefined") {
    dayPreference[6] = true;
  };


  console.log(dayPreference);

  let dateStamps = [];
  let weatherPoints = [];
  let dayPrefAdj = [];
  let iconCodes = [];
  for (var i = 1; i < weatherData.length; i++) {
    let tempDate = new Date(0)
    tempDate.setUTCSeconds(weatherData[i].dt);
    dateStamps.push(tempDate.getDay());
    dayPrefAdj.push(dayPreference[tempDate.getDay()])
    weatherPoints.push(weatherData[i].weather[0].main)
    iconCodes.push(weatherData[i].weather[0].icon)
  };
  console.log(dateStamps);
  console.log(weatherPoints);

  let rainDays = 0;
  //Count how many rainy days - there probably is a better way of doing this.
  weatherPoints.forEach(function(w) {
    if (w.includes("Rain")) {
      rainDays++
    };
  });

  //I have all the data I needed - time for the algorithm!
  //1) If rain days = 7, doesn't matter: what is the default order?
  let resultsArray = [];
  for (var i = 0; i < dateStamps.length; i++) {
    resultsArray.push([]);
    resultsArray[i][0] = dayToString(dateStamps[i]);
    resultsArray[i][1] = "Rest";
    resultsArray[i][2] = `<img src="http://openweathermap.org/img/wn/${iconCodes[i]}@2x.png" alt="Weather Icon">`
  };

  let today = new Date();
  let todayNumber = today.getDay();

  //At this point I have information about user preference, weather the relevant days of the week, and indoor/outdoor numbers
  for(var i=0;i<dayPrefAdj.length;i++){
    if(weatherPoints[i]!=="Rain"&&outdoorDays>0&&dayPrefAdj[i]==true){
      resultsArray[i][1]="Outdoor";
      outdoorDays--;
    }else if(weatherPoints[i]==="Rain"&&indoorDays>0&&dayPrefAdj[i]==true){
      resultsArray[i][1]="Indoor";
      indoorDays--
    }
  };

  for(var i=0;i<resultsArray.length;i++){
    if(resultsArray[i][1]==="Rest"){
      if(weatherPoints[i]!=="Rain"&&outdoorDays>0){
        resultsArray[i][1]="Outdoor";
        outdoorDays--
      }
    }
  };

  for(var i=0;i<resultsArray.length;i++){
    if(resultsArray[i][1]==="Rest"){
      if(indoorDays>0){
        resultsArray[i][1]="Indoor";
        indoorDays--;
      }else if(outdoorDays>0){
        resultsArray[i][1]="Outdoor";
        outdoorDays--;
      }
    }
  };


  //Form app results
  let appResults = {
    firstDay: resultsArray[0],
    secondDay: resultsArray[1],
    thirdDay: resultsArray[2],
    fourthDay: resultsArray[3],
    fifthDay: resultsArray[4],
    sixthDay: resultsArray[5],
    seventhDay: resultsArray[6]
  }


  return appResults
}

function dayToString(day) {
  switch (day) {
    case 0:
      return "Sunday"
      break;
    case 1:
      return "Monday"
      break;
    case 2:
      return "Tuesday"
      break;
    case 3:
      return "Wednesday"
      break;
    case 4:
      return "Thursday"
      break;
    case 5:
      return "Friday"
      break;
    case 6:
      return "Saturday"
      break;
    default:
      return "Error"
  }
}
