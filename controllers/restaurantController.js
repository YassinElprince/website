const { db } = require('../db.js');

// Retrieve all restaurants
const retrieveAllRestaurants = (req, res) => {
    db.all("SELECT * FROM RESTAURANT", [], (err, rows) => {
        if (err) {
            return res.status(500).send("Database error.");
        }

        res.status(200).json({
            status: 'success',
            message: 'Restaurants retrieved successfully',
            results: rows.length,
            data: rows,
        });
    });
};

// Create a new Restaurant
const createRestaurant = (req, res) => {
    const { name, location, food, rating, user_id } = req.body;

    // Basic validation
    if (!name || !location || !food || !rating || !user_id) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    
        // Insert
    const query = `
        INSERT INTO RESTAURANT (NAME, LOCATION, FOOD, RATING, USER_ID)
        VALUES (?, ?, ?, ?, ?)
    `;
    
    const params = [name, location, food, rating, user_id];
    db.run(query, params, function(err) {
        if (err) {
            return res.status(500).send('Database error.');
        }

        res.status(201).json({status: 'success', message: 'Restaurant created successfully', data: this.lastID,
    });
    });
};



module.exports = { 
    retrieveAllRestaurants, 
    createRestaurant 
};

