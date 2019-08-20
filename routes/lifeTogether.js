const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const millisToDays = (millis) => {
    var days = Math.floor(millis / 86400000);
    return days;
  }
  let now = new Date();
  let charles = "Charles";
  let catherine = "Catherine";
  let age_charles = millisToDays(now - new Date("1992-12-18"));
  let age_catherine = millisToDays(now - new Date("1994-10-12"));
  let age_meet = millisToDays(now - new Date("2014-02-19"));
  let age_dating = millisToDays(now - new Date("2014-03-10"));
  let age_married = millisToDays(now - new Date("2018-01-06"));
  let percent_charles = ((age_meet / age_charles) * 100).toFixed(2) + "%";
  let percent_catherine = ((age_meet / age_catherine) * 100).toFixed(2) + "%";

  res.render("life-together-calculator", {
    userName: charles,
    soName: catherine,
    meet: age_meet,
    dating: age_dating,
    married: age_married,
    userPercent: percent_charles,
    soPercent: percent_catherine
  });
});

router.post("/", (req, res) => {
  const millisToDays = (millis) => {
    var days = Math.floor(millis / 86400000);
    return days;
  }

  let now = new Date();
  let yourName = req.body.lifeTogether.yourName;
  let sigOtherName = req.body.lifeTogether.soName;
  let age_user = millisToDays(now - new Date(req.body.lifeTogether.yourBday));
  let age_so = millisToDays(now - new Date(req.body.lifeTogether.soBday));
  let age_meet = millisToDays(now - new Date(req.body.lifeTogether.meetDate));
  let age_dating = millisToDays(now - new Date(req.body.lifeTogether.datingDate));
  let age_married = millisToDays(now - new Date(req.body.lifeTogether.marriedDate));
  let percent_user = ((age_meet / age_user) * 100).toFixed(2) + "%";
  let percent_so = ((age_meet / age_so) * 100).toFixed(2) + "%";


  res.render("life-together-calculator", {
    userName: yourName,
    soName: sigOtherName,
    meet: age_meet,
    dating: age_dating,
    married: age_married,
    userPercent: percent_user,
    soPercent: percent_so
  });
})

module.exports = router;
