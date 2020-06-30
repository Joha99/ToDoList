const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const date = require(__dirname + "/date.js"); 

var app = express();
var items = ["Read", "Eat"];
var workItems = ["Fix bugs"];

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// GET /list
app.get("/", function (req, res) {
  let day = date(); 
  res.render("list", { listTitle: day, newListItems: items });
});

// POST /list
app.post("/views/list", function (req, res) {
  console.log(req.body);
  if (req.body.list === "Work") {
    workItems.push(req.body.newItem);
    res.redirect("/work");
  } else {
    items.push(req.body.newItem);
    res.redirect("/");
  }
});

// GET /work
app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work List", newListItems: workItems });
});

// POST /work
app.post("/work", function (req, res) {
  workItems.push(req.body.newItem);
  res.redirect("/work");
});

//GET /about 
app.get("/about", function (req, res) {
  res.render("about"); 
}) 

// run local server on port 3000
app.listen(3000, function () {
  console.log("Server running on port 3000");
});
