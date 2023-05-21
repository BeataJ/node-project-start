const fs = require('fs');
const path = require('path');

const express = require('express');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res)  => {
  res.render('index');

  // const htmlFilePath = path.join(__dirname, "views", "index.html");
  // res.sendFile(htmlFilePath);
});

app.get('/restaurants', (req,res) => {
  res.render("restaurants");

  // const htmlFilePath = path.join(__dirname, 'views', 'restaurants.html')
  // res.sendFile(htmlFilePath)
});

app.get("/recommend", (req, res) => {
  res.render("recommend");

  // const htmlFildePath = path.join(__dirname, "views", "recommend.html");
  // res.sendFile(htmlFildePath);
});

app.post("/recommend", (req,res) => {
  const restaurant= req.body;
  const filePath = path.join(__dirname, 'data', 'restaurants.json');

  const fielData = fs.readFileSync(filePath);
  const storeRestaurants = JSON.parse(fielData);

  storeRestaurants.push(restaurant);

  fs.writeFileSync(filePath, JSON.stringify(storeRestaurants));

  res.redirect('/confirm')
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


app.listen(3000);