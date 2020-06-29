const express = require("express");
const bp = require("body-parser");
const https = require("https");

var app = express();

app.set("view engine", "ejs");

// GET landing page
app.get("/", function (req, res) {
  var today = new Date();
  var currentDay = today.getDay();
  var day = "";

  switch (currentDay) {
    case 0:
      day = "Sunday";
      break;
    case 1:
      day = "Monday";
      break;
    case 2:
      day = "Tuesday";
      break;
    case 3:
      day = "Wednesday";
      break;
    case 4:
      day = "Thursday";
      break;
    case 5:
      day = "Friday";
      break;
    case 6:
      day = "Saturday";
      break;
  }

  res.render("list", { kindOfDay: day });
});

// POST landing page
app.post("/", function (req, res) {});

// run local server on port 3000
app.listen(3000, function () {
  console.log("Server running on port 3000");
});
