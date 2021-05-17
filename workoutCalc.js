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
  for (var i = 0; i < weatherData.length - 1; i++) {
    let tempDate = new Date(0)
    tempDate.setUTCSeconds(weatherData[i].dt);
    dateStamps.push(tempDate.getDay());
    weatherPoints.push(weatherData[i].weather[0].main)
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
  };
  //Check any days without rain, check if any of them are prefered workouts, if so assign outdoor workout. If more
  //outdoor workout days than prefered, non rainy days, allocate outdoor workout to those.
  //Once outdoor workouts have been set, assign indoor workouts to any left prefered workout days. If none left
  //Prioritise Monday to Friday. Default pref: M -> W -> F -> Tu -> Th -> Sat -> Sun

  //Check prefered days
  for (var i = 0; i < dayPreference.length; i++) {
    if (dayPreference[i]) {
      //It is a prefered workout day
      if ((weatherPoints[dateStamps.indexOf(i)] !== "Rain") && outdoorDays > 0) {
        resultsArray[dateStamps.indexOf(i)][1] = "Outdoors";
        outdoorDays--
      } else if (indoorDays > 0) {
        resultsArray[dateStamps.indexOf(i)][1] = "Indoors";
        indoorDays--;
      }
    }
  };

  //Assign any remaining outdoor days to any non-rainy days
  for (var i = 0; i < weatherPoints.length; i++) {
    if (weatherPoints !== "Rain" && outdoorDays > 0) {
      resultsArray[i][1] = "Outdoors";
      outdoorDays--;
    }
  }

  //If any remaining indoor or outdoor days, assign to pre-determined days
  if (outdoorDays > 0 || indoorDays > 0) {
    let j = 1;
    let iteration = 0;
    while (outdoorDays > 0 || indoorDays > 0) {
      console.log("Loop");
      switch (j) {
        case 0:
        if(resultsArray[j][1]==="Rest"){
          if (outdoorDays > 0) {
            resultsArray[j][1] = "Outdoors"
            outdoorDays--
          } else {
            resultsArray[j][1] = "Indoors"
            indoorDays--
          }
        };
          break;
        case 1:
        if(resultsArray[j][1]==="Rest"){
          if (outdoorDays > 0) {
            resultsArray[j][1] = "Outdoors"
            outdoorDays--
          } else {
            resultsArray[j][1] = "Indoors"
            indoorDays--
          }
        }
          break;
        case 2:
        if(resultsArray[j][1]==="Rest"){
          if (outdoorDays > 0) {
            resultsArray[j][1] = "Outdoors"
            outdoorDays--
          } else {
            resultsArray[j][1] = "Indoors"
            indoorDays--
          }
        }
          break;
        case 3:
        if(resultsArray[j][i]==="Rest"){
          if (outdoorDays > 0) {
            resultsArray[j][1] = "Outdoors"
            outdoorDays--
          } else {
            resultsArray[j][1] = "Indoors"
            indoorDays--
          }
        }
          break;
        case 4:
        if(resultsArray[j][1]==="Rest"){
          if (outdoorDays > 0) {
            resultsArray[j][1] = "Outdoors"
            outdoorDays--
          } else {
            resultsArray[j][1] = "Indoors"
            indoorDays--
          }
        }
          break;
        case 5:
        if(resultsArray[j][1]==="Rest"){
          if (outdoorDays > 0) {
            resultsArray[j][1] = "Outdoors"
            outdoorDays--
          } else {
            resultsArray[j][1] = "Indoors"
            indoorDays--
          }
        }
          break;
        case 6:
        if(resultsArray[j][1]==="Rest"){
          if (outdoorDays > 0) {
            resultsArray[j][1] = "Outdoors"
            outdoorDays--
          } else {
            resultsArray[j][1] = "Indoors"
            indoorDays--
          }
        }
          break;
        default:
        outdoorDays =0;
        indoorDays =0;

      } //END OF SWITCH STATEMENT
      console.log(indoorDays);
      iteration++
      j = nextStandard(iteration);
    }
  }

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

//NOT WORKING CORRECTLY AS IT PRIORITISES THE ARRAY POSITION AND NOT THE DAY!!!
function nextStandard(i) {
  let iMod = 0;
  if(i>6){
    iMod = i%6;
    console.log(iMod);
  }else{
    iMod = i;
  };

  switch (iMod) {
    case 1:
      return 3
      break;
    case 2:
      return 5
      break;
    case 3:
      return 2
      break;
    case 4:
      return 4
      break;
    case 5:
      return 6
      break;
    case 6:
      return 0
      break;
    default:

  };
}
