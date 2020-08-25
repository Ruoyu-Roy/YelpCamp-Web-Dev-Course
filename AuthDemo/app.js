const express = require("express"),
  app = express(),
  mongoose = require("mongoose"),
  passport = require("passport"),
  bodyParser = require("body-parser"),
  LocalStrategy = require("passport-local"),
  passportLocalMongoose = require("passport-local-mongoose")

mongoose.connect("mongodb://localhost/auth_demo_app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  res.render("home");
})

app.get("/secret", function (req, res) {
  res.render("secret");
})

app.listen(3000, function () {
  console.log("Auth Demo Serever is running on PORT:3000");
})