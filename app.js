const express = require("express");
const app = express();
const favicon = require("serve-favicon");
const moment = require("moment");
const bodyParser = require("body-parser");
const indexRoutes = require("./routes/index");
const lifeTogetherRoutes = require("./routes/lifeTogether");
// const sslRedirect = require("heroku-ssl-redirect");

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
// app.use(sslRedirect());
function fixHerokuSSL(environments, status) {
  environments = environments || ["production"];
  status = status || 302;
  return function(req, res, next) {
    if (environments.indexOf(process.env.NODE_ENV) >= 0) {
      if (req.headers["x-forwarded-proto"] != "https") {
        res.redirect(status, "https://" + req.hostname + req.originalUrl);
      } else {
        next();
      }
    } else {
      next();
    }
  };
}
app.use(fixHerokuSSL());
app.use("/life-together-calculator", lifeTogetherRoutes);
app.use("/", indexRoutes);

app
  .listen(port, () => {
    console.log(`Personal website listening on port ${port}!`);
  })
  .on("error", function helperFunction() {
    port += 1;
    app.listen(port, () => {
      console.log(`Personale website listening on port ${port}!`);
    });
  });
