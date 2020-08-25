const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  Campground = require("./models/campground"),
  Comment = require("./models/comment"),
  seedDB = require("./seeds");

seedDB();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: true
}));

mongoose.connect("mongodb://localhost/yelp_camp_v3", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connected to the DB!"))
  .catch((err) => console.log(err.message));

app.get("/", function (req, res) {
  res.render("landing");
});

// Index Page - Show all the Campgrounds
app.get("/campgrounds", function (req, res) {
  // Get all campgrounds from DB
  Campground.find({}, function (err, campgrounds) {
    if (err) {
      console.log(err)
    } else {
      res.render("index", {
        campgrounds: campgrounds,
      });
    }
  });

});

// New Page - Give a form to create new campground
app.get("/campgrounds/new", function (req, res) {
  res.render("new");
});

// Create Page - Create a new Campground according to New Page
app.post("/campgrounds", function (req, res) {
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
      res.redirect("/campgrounds")
    }
  });
});

// Show Page - shows more info about one campground
app.get("/campgrounds/:id", function (req, res) {
  // Find the campground with given ID
  Campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground) {
    if (err) {
      console.log(err)
    } else {
      res.render("show", {
        campground: foundCampground
      });
    }
  });
});

app.listen(3000, function () {
  console.log("YelpCamp App Starts!");
});