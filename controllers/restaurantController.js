const { restaurants } = require('../models/restaurant');

// Retrieve all restaurants
const retrieveAllRestaurants = (req, res) => {
    const allrestaurants = restaurants;
    res.status(200).json({
        status: 'success',
        message: 'Restaurants retrieved successfully',
        results: allrestaurants.length,
        data: allrestaurants,
    });
};

// Create a new restaurant
const createRestaurant = (req, res) => {
    const { 
        name, 
        location, 
        food, 
        rating
    } = req.body;

    if (
        !name || 
        !location
    ) {
        return res.status(400).json({
            status: 'fail',
            message: 'Please provide required fields.',
        });
    } 

    const newRestaurant = {
        id: restaurants.length + 1,
        name,
        location,
        food,
        rating,
    };

    restaurants.push(newRestaurant);

    res.status(201).json({
        status: 'success',
        message: 'Restaurant created successfully',
        data: newRestaurant,
    });
};

module.exports = { 
    retrieveAllRestaurants, 
    createRestaurant 
};
