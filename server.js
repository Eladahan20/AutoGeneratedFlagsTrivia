const express = require("express");
const axios = require('axios').default;
const path = require("path");

API_URL = "https://restcountries.com/v3.1/all/";

// File path.
const port = process.env.PORT || 8080;
const app = express();

app.set('view engine', 'ejs');


let COUNTRIES = [];

const getRandomCountries = async () => {
  const response = await axios.get(API_URL);
  const countries = response.data;
  return countries;
};


app.get("/question", function (req, res) {
    const randomIndexes = Array.from({length: 4}, () => Math.floor(Math.random() * COUNTRIES.length));
    const randomCountries = randomIndexes.map(index => COUNTRIES[index]);
    // Get a random country from the data array
    const randomIndex = Math.floor(Math.random() * randomCountries.length);
    const randomCountry = randomCountries[randomIndex];
    // Get all country names as possible answers
    const answers = randomCountries.map(function (item) {
      return item.name.common;
    });

    res.render("question", {
      flag: randomCountry.flags.png,
      answers: answers,
      correctAnswer: randomCountry.name.common,
    });
  });





app.get("/", function (req, res) {
  res.render('index');
  getRandomCountries().then((countries) => {
    COUNTRIES = countries;
  });
});



app.use("/static", express.static("./static/"));

app.listen(port, () => {
  console.log("Server started");
});
