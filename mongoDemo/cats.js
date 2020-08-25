const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost/cat_app", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to DB!"))
  .catch((error) => console.log(error.message));

const catSchema = new mongoose.Schema({
  name: String,
  age: Number,
  temperament: String,
});

let Cat = mongoose.model("Cat", catSchema);

// add a new cat to the DB

// let newCat = new Cat({
//   name: "Mrs. Norris",
//   age: 7,
//   temperament: "Evil",
// });

// newCat.save(function (err, cat) {
//   if (err) {
//     console.log("something went wrong");
//   } else {
//     console.log("We just saved a cat to the db");
//     console.log(cat);
//   }
// });

Cat.create(
  {
    name: "Diaodiao",
    age: 9,
    temperament: "Nice",
  },
  function (err, cat) {
    if (err) {
      console.log(err);
    } else {
      console.log(cat);
    }
  }
);

// retrieve all cats from the DB and console.log each one

Cat.find({}, function (err, cats) {
  if (err) {
    console.log("Error!");
    console.log(err);
  } else {
    console.log("All the cats......");
    console.log(cats);
  }
});
