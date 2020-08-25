const express = require("express");
const app = express();
const axios = require("axios");

app.set("view engine", "ejs");

app.get("/", function (req, res) {
  res.render("search");
});

app.get("/results", function (req, res) {
  let query = req.query.search;
  let url = "http://www.omdbapi.com/?i=tt3896198&apikey=3c29123a&s=" + query;
  axios.get(url)
    .then(function (response) {
      let data = response.data;
      res.render("result", {
        data: data
      });
    })
    .catch(function (err) {
      res.send(err);
    })
    .finally(function () {

    });
})

app.listen(3000, function () {
  console.log("Movie App has started!!!")
})