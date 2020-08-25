let express = require("express");
let app = express();
let bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

let friends = ["Tony", "Miranda", "Justin", "Pierre", "Lily"];

app.get("/", function (req, res) {
  res.render("home");
});

app.get("/friends", function (req, res) {
  res.render("friends", {
    friends: friends,
  });
});

app.post("/addfriends", function (req, res) {
  let newFriend = req.body.newFriend;
  friends.push(newFriend);
  res.redirect("/friends");
});

app.listen(3000, function () {
  console.log("This server is listening!");
});
