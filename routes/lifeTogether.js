const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const millisToDays = (millis) => {
    var days = Math.floor(millis / 86400000);
    return days;
  }
  let now = new Date();
  let age_charles = millisToDays(now - new Date("1992-12-18"));
  let age_catherine = millisToDays(now - new Date("1994-10-12"));
  let age_meet = millisToDays(now - new Date("2014-03-10"));
  let age_married = millisToDays(now - new Date("2018-01-06"));
  let percent_charles = ((age_meet / age_charles) * 100).toFixed(2) + "%";
  let percent_catherine = ((age_meet / age_catherine) * 100).toFixed(2) + "%";

  res.render("life-together-calculator", {
    meet: age_meet,
    married: age_married,
    charlesPercent: percent_charles,
    catherinePercent: percent_catherine
  });
});

router.post("/", (req, res)=> {
  console.log(req.body);
})

module.exports = router;
