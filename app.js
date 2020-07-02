const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash"); 

var app = express();
// var items = ["Read", "Eat"];
// var workItems = ["Fix bugs"];

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// create new DB called todolistDB
mongoose.connect("mongodb://localhost:27017/todolistDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// create schemas for collections
const itemSchema = {
  name: String,
};

const customListSchema = {
  name: String,
  items: [itemSchema],
};

// create Collections
const Item = mongoose.model("Item", itemSchema);
const List = mongoose.model("List", customListSchema);

// create default documents for the Item(s) collection
const item1 = new Item({ name: "Welcome to your To Do List!" });
const item2 = new Item({ name: "Hit the + button to add a new list item." });
const item3 = new Item({ name: "<-- Check off item to delete it." });
const defaultItems = [item1, item2, item3];

// GET /list
app.get("/", function (req, res) {
  // add the default items to the list IFF Items collection is empty
  Item.count({}, function (err, count) {
    console.log("There are " + count + " documents in Items collection.");
    if (count === 0) {
      // add default documents to the Item(s) collection
      Item.insertMany(defaultItems, function (err) {
        if (err) {
          console.log(
            "There was an error adding default elements to the Items collection."
          );
        } else {
          console.log(
            "Successfully added default items to the Items collection."
          );
        }
      });
    }
  });

  // get and display all the documents in Items collection
  Item.find({}, function (err, foundItems) {
    if (err) {
      console.log(
        "There was an error loading all the items in the Items collection."
      );
    } else {
      res.render("list", { listTitle: "Today", newListItems: foundItems });
    }
  });
});

// POST /list
app.post("/views/list", function (req, res) {
  console.log(req.body);
  const itemName = req.body.newItem;
  const newItem = new Item({ name: itemName });
  const listName = req.body.listName;
  if (listName === "Today") {
    newItem.save();
    res.redirect("/");
  } else {
    List.findOne({ name: listName }, function (err, foundList) {
      if (!err) {
        foundList.items.push(newItem);
        foundList.save();
        res.redirect("/" + listName);
      }
    });
  }
});

// GET /listTitle
app.get("/:customListName", function (req, res) {
  const customListName = _.capitalize(req.params.customListName);

  // check if list document with name of customListName already exists
  List.findOne({ name: customListName }, function (err, list) {
    if (!err) {
      if (!list) {
        // create a new list
        console.log("list doesn't exist");
        const list = new List({ name: customListName, items: defaultItems });
        list.save();
        res.redirect("/" + customListName);
      } else {
        // show the existing list
        console.log("list exists");
        res.render("list", { listTitle: list.name, newListItems: list.items });
      }
    }
  });
});

// POST /work
// app.post("/work", function (req, res) {
//   workItems.push(req.body.newItem);
//   res.redirect("/work");
// });

//GET /about
app.get("/about", function (req, res) {
  res.render("about");
});

// POST /delete
app.post("/delete", function (req, res) {
  console.log(req.body);
  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;

  if (listName === "Today") {
    Item.deleteOne({ _id: checkedItemId }, function (err) {
      console.log(
        "successfully checked off and deleted from Items collection. "
      );
      res.redirect("/");
    });
  } else {
    List.findOneAndUpdate({ name: listName }, {$pull: {items: {_id: checkedItemId}}}, function (err, results) {
      if (!err) {
        res.redirect("/" + listName); 
      }
    });
  }
});

// run local server on port 3000
app.listen(3000, function () {
  console.log("Server running on port 3000");
});
