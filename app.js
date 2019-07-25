const express = require("express");
const app = express();
const favicon = require("serve-favicon");
const port = process.env.PORT || 3000;
const moment = require("moment");

app.set("view engine", "ejs");
app.use("/assets", express.static(__dirname + "/public"));
app.use(favicon(__dirname + "/public/images/favicon.ico"));
app.use("/assets", express.static(__dirname + "/public"));

app.use(function(req, res, next) {
  res.locals.today = moment().format("DD MMMM YYYY");
  next();
});

//ROUTES
app.get("/", (req, res) => {
  res.render("index");
});
app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/reading-list", (req, res) => {
  res.render("reading-list");
});
app.get("/life-together-calculator", (req, res) => {
  res.render("life-together-calculator");
});

app.get("/test-route1", (req, res) => {
  res.send(
    "On August 12th, 2018, I would have been ordained in the Lutheran Church — Missouri Synod if I had stayed on that path. But four and a half years ago, I chose to not go to seminary."
  );
});

app.get("/test-route2", (req, res) => {
  res.send(
    "Basically, it’s the distinction between what you love and what you love to do. I’ll use myself as an example."
  );
});

app.get("/test-route3", (req, res) => {
  res.send(
    "I can spend hours coding or learning about development without getting bored. My frustrations increase my resolve and determination to find a solution. My wife will tell me, “come to bed” and I’ll respond “just a few more minutes.” The only thing that has ever done that for me is… video games. Programming is the only thing I’ve found that competes with video games for my attention."
  );
});

app.listen(port, process.env.IP, (req, res) => {
  console.log(`listening on ${port}`);
});
