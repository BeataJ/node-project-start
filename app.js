const fs = require("fs");
const path = require("path");

const express = require("express");
const uuid = require('uuid');

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("index");

  // const htmlFilePath = path.join(__dirname, "views", "index.html");
  // res.sendFile(htmlFilePath);
});

app.get("/restaurants", (req, res) => {
  const filePath = path.join(__dirname, "data", "restaurants.json");

  const fielData = fs.readFileSync(filePath);
  const storedRestaurants = JSON.parse(fielData);

  res.render("restaurants", {
    numberOfRestaurants: storedRestaurants.length,
    restaurants: storedRestaurants,
  });

  // const htmlFilePath = path.join(__dirname, 'views', 'restaurants.html')
  // res.sendFile(htmlFilePath)
});

app.get('/restaurants/:id', (req,res) => {
  const restaurantId =  req.params.id;

  const filePath = path.join(__dirname, "data", "restaurants.json");

  const fielData = fs.readFileSync(filePath);
  const storedRestaurants = JSON.parse(fielData);

  for (const restaurant of storedRestaurants) {
    if(restaurant.id === restaurantId) {
      return res.render("restaurants-detail", { restaurant: restaurant });
    }
  }

  res.status(404).render('404');

})

app.get("/recommend", (req, res) => {
  res.render("recommend");

  // const htmlFildePath = path.join(__dirname, "views", "recommend.html");
  // res.sendFile(htmlFildePath);
});

app.post("/recommend", (req, res) => {
  const restaurant = req.body;
  restaurant.id = uuid.v4();
  const filePath = path.join(__dirname, "data", "restaurants.json");

  const fielData = fs.readFileSync(filePath);
  const storedRestaurants = JSON.parse(fielData);

  storedRestaurants.push(restaurant);

  fs.writeFileSync(filePath, JSON.stringify(storedRestaurants));

  res.redirect("confirm");
});

app.get("/confirm", (req, res) => {
  res.render("confirm");

  // const htmlFilePath = path.join(__dirname, "views", "confirm.html");
  // res.sendFile(htmlFilePath);
});

app.get("/about", (req, res) => {
  res.render("about");

  // const htmlFilePath = path.join(__dirname, "views", "about.html");
  // res.sendFile(htmlFilePath);
});

app.use((req,res) => {
  res.status(404).render('404');
});

app.use((error, req, res, next) => {
  res.status(500).render('500');
})

app.listen(3000);
