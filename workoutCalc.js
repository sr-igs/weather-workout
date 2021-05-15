exports.doCalcs = function(userReq, weatherData) {
  //userReq will be the req.body
  let outdoorDays = Number(userReq.outdoor); //Number of outdoor workout days from the request
  let indoorDays = Number(userReq.indoor); //Number of indoor workout days from the request
  console.log("Outdoor" + outdoorDays);
  console.log("Indoor:" + indoorDays);

  //This is the object that will hold the information that is passed to the website
  let appResults = {
    firstDay: ["Monday", "Outdoor"],
    secondDay: ["Monday", "Indoor"],
    thirdDay: ["Monday", "Outdoor"],
    fourthDay: ["Monday", "Indoor"],
    fifthDay: ["Monday", "Indoor"],
    sixthDay: ["Monday", "Indoor"],
    seventhDay: ["Monday", "Indoor"]
  }

  //Need to add code to detect the checkboxes. Challenge is that if checkbox is not marked it won't submit a value to the server!!!
  let dayPreference = {
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false
  };
  if (typeof(userReq.mondayCB) !== "undefined") {
    dayPreference.monday = true
  };
  if (typeof(userReq.tuesdayCB) !== "undefined") {
    dayPreference.tuesday = true
  };
  if (typeof(userReq.wednesdayCB) !== "undefined") {
    dayPreference.wednesday = true
  };
  if (typeof(userReq.thursdayCB) !== "undefined") {
    dayPreference.thursday = true
  };
  if (typeof(userReq.fridayCB) !== "undefined") {
    dayPreference.friday = true
  };
  if (typeof(userReq.saturdayCB) !== "undefined") {
    dayPreference.saturday = true
  };
  if (typeof(userReq.sundayCB) !== "undefined") {
    dayPreference.sunday = true
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
  //2

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
}
