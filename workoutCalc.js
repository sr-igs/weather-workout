function doCalcs(userReq){
  //userReq will be the req.body
  let outdoorDays = Number(userReq.outdoor); //Number of outdoor workout days from the request
  let indoorDays = Number(userReq.indoor); //Number of indoor workout days from the request

  //Need to add code to detect the checkboxes. Challenge is that if checkbox is not marked it won't submit a value to the server!!!
  let dayPreference = {monday:false,tuesday:false,wednesday:false,thursday:false,friday:false,saturday:false,sunday:false};
  if(typeof(userReq.mondayCB)!=="undefined"){dayPreference.monday=true};
  if(typeof(userReq.tuesdayCB)!=="undefined"){dayPreference.tuesday=true};
  if(typeof(userReq.wednesdayCB)!=="undefined"){dayPreference.wednesday=true};
  if(typeof(userReq.thursdayCB)!=="undefined"){dayPreference.thursday=true};
  if(typeof(userReq.fridayCB)!=="undefined"){dayPreference.friday=true};
  if(typeof(userReq.saturdayCB)!=="undefined"){dayPreference.saturday=true};
  if(typeof(userReq.sundayCB)!=="undefined"){dayPreference.sunday=true};

}
