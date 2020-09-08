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
router.get("/new", isLoggedIn, function (req, res) {
  res.render("campgrounds/new");
});

// Create Page - Create a new Campground according to New Page
router.post("/", isLoggedIn, function (req, res) {
  // get data from form and add to campgrounds page
  let name = req.body.name;
  let img = req.body.image;
  let description = req.body.description;
  let author = {
    id: req.user._id,
    username: req.user.username
  }
  let newCampground = {
    name: name,
    image: img,
    description: description,
    author: author
  };
  Campground.create(newCampground, function (err, campground) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/campgrounds")
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

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

module.exports = router;