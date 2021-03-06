const express = require("express");
const router = express.Router({
  mergeParams: true
});
const Campground = require("../models/campground")
const Comment = require("../models/comment")
// Comments Routes
router.get("/new", isLoggedIn, function (req, res) {
  Campground.findById(req.params.id, function (err, campground) {
    if (err) {
      console.log(err);
    } else {
      res.render("comments/new", {
        campground: campground
      })
    }
  });
})

router.post("/", isLoggedIn, function (req, res) {
  //look up campground using id
  Campground.findById(req.params.id, function (err, campground) {
    if (err) {
      console.log(err);
      res.redirect("/campgrounds");
    } else {
      //create new comment
      Comment.create(req.body.comment, function (err, comment) {
        if (err) {
          console.log(err);
          res.redirect("/campgrounds");
        } else {
          // connect comments to campground
          campground.comments.push(comment);
          campground.save();
          // redierect to show page
          res.redirect("/campgrounds/" + campground._id);
        }
      })
    }
  })
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

module.exports = router;