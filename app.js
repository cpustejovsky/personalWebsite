const express = require("express");
const app = express();
const favicon = require("serve-favicon");
const moment = require("moment");
const bodyParser = require("body-parser");
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
app.use("/life-together-calculator", lifeTogetherRoutes);
app.use("/", indexRoutes);

if (process.env.NODE_ENV === "production") {
  app.use((req, res, next) => {
    if (req.header("x-forwarded-proto") !== "https")
      res.redirect(`https://${req.header("host")}${req.url}`);
    else next();
  });
}

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
