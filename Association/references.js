const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/blog_demo_2", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => console.log("Connected to DB!"))
  .catch((err) => console.log(err));

const Post = require("./models/post");
const User = require("./models/user");

// User.create({
//   email: "bob@gmail.com",
//   name: "Bob Belcher"
// });

// Post.create({
//   title: "How to cook the best rice",
//   content: "blah blah blah"
// }, function (err, post) {
//   if (err) {
//     console.log(err);
//   } else {
//     User.findOne({
//       email: "bob@gmail.com"
//     }, function (err, foundUser) {
//       if (err) {
//         console.log(err);
//       } else {
//         foundUser.posts.push(post);
//         foundUser.save(function (err, data) {
//           if (err) {
//             console.log(err);
//           } else {
//             console.log(data);
//           }
//         })
//       }
//     })
//   }
// })

User.findOne({
  email: "bob@gmail.com"
}).populate("posts").exec(function (err, user) {
  if (err) {
    console.log(err);
  } else {
    console.log(user);
  }
})