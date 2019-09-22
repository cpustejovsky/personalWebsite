const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});
router.get("/about", (req, res) => {
  res.render("about");
});
router.get("/reading-list", (req, res) => {
  res.render("reading-list");
});

router.get("/estuary", (req, res) => {
  res.redirect("https://cpustejovsky-estuary.herokuapp.com/");
});

router.get("/markdown", (req, res) => {
  res.render("markdown");
});

router.get("/test-route1", (req, res) => {
  res.send(
    "On August 12th, 2018, I would have been ordained in the Lutheran Church — Missouri Synod if I had stayed on that path. But four and a half years ago, I chose to not go to seminary."
  );
});

router.get("/test-route2", (req, res) => {
  res.send(
    "Basically, it’s the distinction between what you love and what you love to do. I’ll use myself as an example."
  );
});

router.get("/test-route3", (req, res) => {
  res.send(
    "I can spend hours coding or learning about development without getting bored. My frustrations increase my resolve and determination to find a solution. My wife will tell me, “come to bed” and I’ll respond “just a few more minutes.” The only thing that has ever done that for me is… video games. Programming is the only thing I’ve found that competes with video games for my attention."
  );
});

module.exports = router;
