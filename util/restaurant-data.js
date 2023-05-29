const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..' ,"data", "restaurants.json");

const getStoredRestaurants = () => {

    const fielData = fs.readFileSync(filePath);
    const storedRestaurants = JSON.parse(fielData);

    return storedRestaurants;
}

const storeRestaurants = (storableRestaurants) => {
    fs.writeFileSync(filePath, JSON.stringify(storableRestaurants));
}

module.exports = {
  getStoredRestaurants: getStoredRestaurants,
  storeRestaurants: storeRestaurants,
};