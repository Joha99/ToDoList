const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

var app = express();
var items = ["Read", "Eat"];

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); 

// GET landing page
app.get("/", function (req, res) {
  var today = new Date();

  var options = { weekday: "long", day: "numeric", month: "long" };

  var day = today.toLocaleDateString("en-US", options);

  res.render("list", { kindOfDay: day, newListItems: items });
});

// POST from list.ejs
app.post("/views/list", function (req, res) {
  console.log(req.body);
  items.push(req.body.newItem);
  console.log(items);
  res.redirect("/");
});

// run local server on port 3000
app.listen(3000, function () {
  console.log("Server running on port 3000");
});
