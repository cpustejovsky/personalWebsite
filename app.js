const express = require("express");
const app = express();
const favicon = require("serve-favicon");
const port = (process.env.PORT = 3000);
app.set("view engine", "ejs");
app.use("/assets", express.static(__dirname + "/public"));
app.use(favicon(__dirname + "/public/images/favicon.ico"));
app.get("/", (req, res) => {
  res.render("index");
});

app.listen(port, (req, res) => {
  console.log(`listening on ${port}`);
});
