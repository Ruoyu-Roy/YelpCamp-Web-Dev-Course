const express = require("express");
const router = express.Router({
  mergeParams: true,
});
const Campground = require("../models/campground");
const campground = require("../models/campground");
const middleware = require("../middleware");

// Index Page - Show all the Campgrounds
router.get("/", function (req, res) {
  // Get all campgrounds from DB
  Campground.find({}, function (err, campgrounds) {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/index", {
        campgrounds: campgrounds,
      });
    }
  });
});

// New Page - Give a form to create new campground
router.get("/new", middleware.isLoggedIn, function (req, res) {
  res.render("campgrounds/new");
});

// Create Page - Create a new Campground according to New Page
router.post("/", middleware.isLoggedIn, function (req, res) {
  // get data from form and add to campgrounds page
  let name = req.body.name;
  let img = req.body.image;
  let description = req.body.description;
  let price = req.body.price;
  let author = {
    id: req.user._id,
    username: req.user.username,
  };
  let newCampground = {
    name: name,
    image: img,
    description: description,
    price: price,
    author: author,
  };
  Campground.create(newCampground, function (err, campground) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/campgrounds");
    }
  });
});

// Show Page - shows more info about one campground
router.get("/:id", function (req, res) {
  // Find the campground with given ID
  Campground.findById(req.params.id)
    .populate("comments")
    .exec(function (err, foundCampground) {
      if (err) {
        console.log(err);
      } else {
        res.render("campgrounds/show", {
          campground: foundCampground,
        });
      }
    });
});

// Edit Campground route
router.get("/:id/edit", middleware.checkCampgroundOwnership, function (req, res) {
  Campground.findById(req.params.id, function (err, foundCampground) {
    res.render("campgrounds/edit", {
      campground: foundCampground,
    });
  });
});
// Update Campground route
router.put("/:id", middleware.checkCampgroundOwnership, function (req, res) {
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, function (
    err,
    updatedCampground
  ) {
    if (err) {
      res.redirect("/campgrounds");
    } else {
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

// Destroy Campground Routes
router.delete("/:id", middleware.checkCampgroundOwnership, function (req, res) {
  Campground.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      res.redirect("/campgrounds");
    } else {
      res.redirect("/campgrounds");
    }
  });
});

module.exports = router;