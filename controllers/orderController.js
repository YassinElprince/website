const { db } = require('../db.js');

// Retrieve all orders
const retrieveAllOrders = (req, res) => {
    db.all("SELECT * FROM ORDER_TABLE", [], (err, rows) => {
        if (err) return res.status(500).send("Database error.");
        res.status(200).json({
            status: 'success',
            message: 'Orders retrieved successfully',
            results: rows.length,
            data: rows,
        });
    });
};

// Create a new Order
const createOrder = (req, res) => {
    const {customer_email,restaurant_id, items} = req.body;
    
    //basic validation
    if (!customer_email || !restaurant_id || !items) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    //insert
    const query = `
        INSERT INTO ORDER_TABLE (CUSTOMER_EMAIL, RESTAURANT_ID, ITEMS)
        VALUES (?, ?, ?)
    `;

    const params = [customer_email, restaurant_id, items];
    db.run(query, params, function(err) {
        if (err) return res.status(500).send('Database error.');

        res.status(201).json({
            status: 'success',
            message: 'Order created successfully',
            data: this.lastID,
        });
    });
};

module.exports = { 
    retrieveAllOrders, 
    createOrder 
};

