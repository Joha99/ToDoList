const express = require("express");
const bp = require("body-parser");
const https = require("https");

var app = express();

// GET landing page
app.get("/", function (req, res) {
  var today = new Date();
  if (today.getDay() === 0 || today.getDay() === 6) {
    res.sendFile(__dirname + "/index.html");
  } else {
    res.sendFile(__dirname + "/index.html");
  }
});

// POST landing page
app.post("/", function (req, res) {});

// run local server on port 3000
app.listen(3000, function () {
  console.log("Server running on port 3000");
});
