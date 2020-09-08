const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  Campground = require("./models/campground"),
  Comment = require("./models/comment"),
  passport = require("passport"),
  LocalStrategy = require("passport-local"),
  User = require("./models/user"),
  seedDB = require("./seeds");

seedDB();
app.use(require("express-session")({
  secret: "Once again Rusty wins cutest dog!",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(__dirname + "/public"));
app.use(function (req, res, next) {
  res.locals.curUser = req.user;
  next();
});

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
      res.render("campgrounds/index", {
        campgrounds: campgrounds,
      });
    }
  });

});

// New Page - Give a form to create new campground
app.get("/campgrounds/new", function (req, res) {
  res.render("campgrounds/new");
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
      res.render("campgrounds/show", {
        campground: foundCampground
      });
    }
  });
});

// Comments Routes
app.get("/campgrounds/:id/comments/new", isLoggedIn, function (req, res) {
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

app.post("/campgrounds/:id/comments", isLoggedIn, function (req, res) {
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

// ================
// Auth Routes
// ================
// handle sign up page
app.get("/register", function (req, res) {
  res.render("register");
});
// handle sign up logic
app.post("/register", function (req, res) {
  let newUser = new User({
    username: req.body.username
  });
  User.register(newUser, req.body.password, function (err, user) {
    if (err) {
      console.log(err);
      return res.render("/resgiter");
    }
    passport.authenticate("local")(req, res, function () {
      res.redirect("/campgrounds");
    });
  });
});
// show login form
app.get("/login", function (req, res) {
  res.render("login");
});
// handle login logic
app.post("/login", passport.authenticate("local", {
  successRedirect: "/campgrounds",
  failureRedirect: "/login"
}), function (req, res) {});
// add logout route
app.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/campgrounds");
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

app.listen(3000, function () {
  console.log("YelpCamp App Starts!");
});