const express = require("express");
const app = express();
const favicon = require("serve-favicon");
const port = (process.env.PORT = 3000);
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

app.listen(port, (req, res) => {
  console.log(`listening on ${port}`);
});
