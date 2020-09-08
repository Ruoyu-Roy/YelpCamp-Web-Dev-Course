const express = require("express");
const router = express.Router({
  mergeParams: true
});
const passport = require("passport");
const User = require("../models/user")
router.get("/", function (req, res) {
  res.render("landing");
});

// ================
// Auth Routes
// ================
// handle sign up page
router.get("/register", function (req, res) {
  res.render("register");
});
// handle sign up logic
router.post("/register", function (req, res) {
  let newUser = new User({
    username: req.body.username
  });
  User.register(newUser, req.body.password, function (err, user) {
    if (err) {
      req.flash("error", err.message)
      return res.redirect("/register");
    }
    passport.authenticate("local")(req, res, function () {
      req.flash("success", "Welcome to YelpCamp, " + user.username);
      res.redirect("/campgrounds");
    });
  });
});
// show login form
router.get("/login", function (req, res) {
  res.render("login");
});
// handle login logic
router.post("/login", passport.authenticate("local", {
  successRedirect: "/campgrounds",
  failureRedirect: "/login"
}), function (req, res) {});
// add logout route
router.get("/logout", function (req, res) {
  req.logout();
  req.flash("error", "Logged you out!");
  res.redirect("/campgrounds");
});

module.exports = router;