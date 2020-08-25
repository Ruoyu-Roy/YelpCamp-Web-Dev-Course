const express = require("express"),
  app = express(),
  methodOverride = require("method-override"),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  expressSanitizer = require("express-sanitizer");

// App Config
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(expressSanitizer());

mongoose
  .connect("mongodb://localhost/restful_blog_app", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Connected to DB!"))
  .catch((err) => console.log(err));

// Title | Image | Body | created
// Mongoose/Model Config
const blogSchema = new mongoose.Schema({
  title: String,
  image: {
    type: String,
    default:
      "https://images.unsplash.com/photo-1597893731206-d00f73afd6f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  },
  body: String,
  created: {
    type: Date,
    default: Date.now,
  },
});
const Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
//   title: "Test Blog",
//   image: "https://images.unsplash.com/photo-1597893731206-d00f73afd6f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
//   body: "Hello This is a blog post!"
// }, function (err, blog) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(blog);
//   }
// })

//RESTful Routes
app.get("/", function (req, res) {
  res.redirect("/blogs");
});
//Index Route
app.get("/blogs", function (req, res) {
  Blog.find({}, function (err, blogs) {
    if (err) {
      console.log(err);
    } else {
      res.render("index", {
        blogs: blogs,
      });
    }
  });
});

//New Route
app.get("/blogs/new", function (req, res) {
  res.render("new");
});

// Create Route
app.post("/blogs", function (req, res) {
  req.body.blog.body = req.sanitize(req.body.blog.body);
  Blog.create(req.body.blog, function (err, blog) {
    if (err) {
      res.render("new");
    } else {
      res.redirect("/blogs");
    }
  });
});

//Show Route
app.get("/blogs/:id", function (req, res) {
  Blog.findById(req.params.id, function (err, foundBlog) {
    if (err) {
      res.redirect("/blogs");
    } else {
      res.render("show", {
        blog: foundBlog,
      });
    }
  });
});

//Edit Route
app.get("/blogs/:id/edit", function (req, res) {
  Blog.findById(req.params.id, function (err, foundBlog) {
    if (err) {
      res.redirect("/blogs");
    } else {
      res.render("edit", {
        blog: foundBlog,
      });
    }
  });
});

// UPDATE Route
app.put("/blogs/:id", function (req, res) {
  req.body.blog.body = req.sanitize(req.body.blog.body);
  Blog.findByIdAndUpdate(req.params.id, req.body.blog, function (
    err,
    updatedBlog
  ) {
    if (err) {
      res.redirect("/blogs");
    } else {
      res.redirect("/blogs/" + req.params.id);
    }
  });
});

//Destroy Route
app.delete("/blogs/:id", function (req, res) {
  // destroy blog
  Blog.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      res.redirect("/blogs");
    } else {
      res.redirect("/blogs");
    }
  });
  //redirect somewhere
});

app.listen(3000, function () {
  console.log("Blog App is Running!");
});
