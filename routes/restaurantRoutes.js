const express = require('express');
const {
  createRestaurant,
  retrieveAllRestaurants,
} = require('../controllers/restaurantController.js');

const { verifyToken, verifyAdmin } = require('../controllers/authController.js'); // import it

const restaurantRouter = express.Router();

// All restaurants
restaurantRouter
  .route('/')
  .post(verifyAdmin, createRestaurant)        // Add new restaurant
  .get(verifyToken, retrieveAllRestaurants);  // Get all restaurant for authenticated users

module.exports = restaurantRouter;