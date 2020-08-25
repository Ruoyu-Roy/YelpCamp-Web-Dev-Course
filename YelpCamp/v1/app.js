const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

var campgrounds = [
  {
    name: "Salmon Creek",
    image:
      "https://images.unsplash.com/photo-1533873984035-25970ab07461?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  },
  {
    name: "Grantie Hill",
    image:
      "https://images.unsplash.com/photo-1597071118769-3d970bd1652b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  },
  {
    name: "Mountain Goat's Rest",
    image:
      "https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  },
  {
    name: "Salmon Creek",
    image:
      "https://images.unsplash.com/photo-1533873984035-25970ab07461?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  },
  {
    name: "Grantie Hill",
    image:
      "https://images.unsplash.com/photo-1597071118769-3d970bd1652b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  },
  {
    name: "Mountain Goat's Rest",
    image:
      "https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  },
];

app.get("/", function (req, res) {
  res.render("landing");
});

app.get("/campgrounds", function (req, res) {
  res.render("campgrounds", {
    campgrounds: campgrounds,
  });
});

app.get("/campgrounds/new", function (req, res) {
  res.render("new");
});

app.post("/campgrounds", function (req, res) {
  // get data from form and add to campgrounds page
  let name = req.body.name;
  let img = req.body.image;
  let newCampground = { name: name, image: img };
  campgrounds.push(newCampground);
  // redirect to campgrounds page
  res.redirect("/campgrounds");
});

app.listen(3000, function () {
  console.log("YelpCamp App Starts!");
});
