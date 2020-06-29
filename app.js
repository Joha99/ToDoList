const express = require("express");
const bp = require("body-parser");
const https = require("https");

var app = express();

app.set('view engine', 'ejs');

// GET landing page
app.get("/", function (req, res) {
  var today = new Date();
  var day = "";
  if (today.getDay() === 0 || today.getDay() === 6) {
    day = "weekend";
  } else {
    day = "weekday";
  }
  res.render("list", { kindOfDay: day });

});

// POST landing page
app.post("/", function (req, res) {});

// run local server on port 3000
app.listen(3000, function () {
  console.log("Server running on port 3000");
});
