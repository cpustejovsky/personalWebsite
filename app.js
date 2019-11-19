const express = require("express");
const app = express();
const favicon = require("serve-favicon");
const moment = require("moment");
const bodyParser = require("body-parser");
const fixHerokuSSL = require("./middleware/herokuSSL");
const dynoWaker = require("./middleware/dynoWaker")
const schedule = require("node-schedule");

//ROUTES and varibales
const indexRoutes = require("./routes/index");
const lifeTogetherRoutes = require("./routes/lifeTogether");
let port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use("/assets", express.static(__dirname + "/public"));
app.use(favicon(__dirname + "/public/images/favicon.ico"));
app.use("/assets", express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
  res.locals.today = moment().format("DD MMMM YYYY");
  next();
});
app.use(fixHerokuSSL());
app.use("/life-together-calculator", lifeTogetherRoutes);
app.use("/", indexRoutes);

app
  .listen(port, () => {
    console.log(`Personal website listening on port ${port}!`);
    dynoWaker()
  })
  .on("error", function helperFunction() {
    port += 1;
    app.listen(port, () => {
      console.log(`Personal website listening on port ${port}!`);
      dynoWaker()
    });
  });
