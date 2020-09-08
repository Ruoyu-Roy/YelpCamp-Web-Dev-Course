const express = require("express");
const router = express.Router({
  mergeParams: true
});
const Campground = require("../models/campground");

// Index Page - Show all the Campgrounds
router.get("/", function (req, res) {
  // Get all campgrounds from DB
  Campground.find({}, function (err, campgrounds) {
    if (err) {
      console.log(err)
    } else {
      res.render("campgrounds/index", {
        campgrounds: campgrounds,
      });
    }
  });

});

// New Page - Give a form to create new campground
router.get("/new", function (req, res) {
  res.render("campgrounds/new");
});

// Create Page - Create a new Campground according to New Page
router.post("/", function (req, res) {
  // get data from form and add to campgrounds page
  let name = req.body.name;
  let img = req.body.image;
  let description = req.body.description;
  let newCampground = {
    name: name,
    image: img,
    description: description
  }
  Campground.create(newCampground, function (err, campground) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/camprgounds")
    }
  });
});

// Show Page - shows more info about one campground
router.get("/:id", function (req, res) {
  // Find the campground with given ID
  Campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground) {
    if (err) {
      console.log(err)
    } else {
      res.render("campgrounds/show", {
        campground: foundCampground
      });
    }
  });
});

module.exports = router;