formatTime = function(){
  var date = new Date()

  var options = {
    weekday: "long", year: "numeric", month: "short",
    day: "numeric", hour: "2-digit", minute: "2-digit"
  };

  return date.toLocaleTimeString("en-us", options);
}