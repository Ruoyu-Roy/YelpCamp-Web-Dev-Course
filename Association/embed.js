const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/blog_demo", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => console.log("Connected to DB!"))
  .catch((err) => console.log(err));

// POST - title, content
const postSchema = new mongoose.Schema({
  title: String,
  content: String,
});
const Post = mongoose.model("Post", postSchema);

// USER - email, name
const userSchema = new mongoose.Schema({
  email: String,
  name: String,
  posts: [postSchema],
});
const User = mongoose.model("User", userSchema);

// let newUser = new User({
//   email: "hermione@hogwarts.edu",
//   name: "Hermione Granger"
// });
// newUser.posts.push({
//   title: "How to bre ployjuice potion",
//   content: "Just Kidding. Go to potions class to learn it!"
// });
// newUser.save(function (err, user) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("New User: ");
//     console.log(user);
//   }
// });
// let newPost = new Post({
//   title: "Reflections on Apples",
//   content: "They are delicious."
// });
// newPost.save(function (err, post) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("New User: ");
//     console.log(post);
//   }
// });

User.findOne({
  name: "Hermione Granger"
}, function (err, user) {
  if (err) {
    console.log(err);
  } else {
    user.posts.push({
      title: "3 things i really hate",
      content: "Voldemort, Voldemort, Voldemort"
    });
    user.save(function (err, user) {
      if (err) {
        console.log(err);
      } else {
        console.log(user);
      }
    })
  }
});