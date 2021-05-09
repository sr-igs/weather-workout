let indoorWorkoutNumber = 0;
let outdoorWorkoutNumber = 0;
let restDays = 7;

$(".restDays").val(restDays);

$(".indoorInput").change(function() {
  triggerChanges(this.className);
})

$(".outdoorInput").change(function() {
  triggerChanges(this.className);
})

function triggerChanges(origin) {
  console.log(origin);
  let tempNumber = 0;
  if (origin === "indoorInput") {
    tempNumber = Number($("." + origin).val()) + outdoorWorkoutNumber;
  } else {
    tempNumber = Number($("." + origin).val()) + indoorWorkoutNumber;
  }
  console.log(tempNumber);
  if (tempNumber <= 7) {
    indoorWorkoutNumber = Number($(".indoorInput").val());
    outdoorWorkoutNumber = Number($(".outdoorInput").val());
    restDays = 7 - indoorWorkoutNumber - outdoorWorkoutNumber;
    $(".restDays").val(restDays);
  }else{
    //Alert here that the action is not possible!
  }

}
