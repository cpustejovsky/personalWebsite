// Establshing length of years for Catherine, Charles, our meeting, and the present
var now = new Date();
var age_charles = now - new Date("1992-12-18");
var age_catherine = now - new Date("1994-10-12");
var age_meet = now - new Date("2014-03-10");
var age_married = now - new Date("2018-01-06");

function millisToDays(millis) {
  var days = Math.floor(millis / 86400000);
  return days;
}

// Turning those years into percentages
var percent_charles = ((age_meet / age_charles) * 100).toFixed(2) + "%";
var percent_catherine = ((age_meet / age_catherine) * 100).toFixed(2) + "%";

// Setting those percent values to charles and catherine ids
document.getElementById("charles").innerHTML = percent_charles;
document.getElementById("catherine").innerHTML = percent_catherine;
document.getElementById("meeting").innerHTML = millisToDays(age_meet);
document.getElementById("married").innerHTML = millisToDays(age_married);
