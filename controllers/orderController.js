const { orders } = require('../models/order');

// Retrieve all orders
const retrieveAllOrders = (req, res) => {
    const allorders = orders;
    res.status(200).json({
        status: 'success',
        message: 'Orders retrieved successfully',
        results: allorders.length,
        data: allorders,
    });
};

// Create a new order
const createOrder = (req, res) => {
    const { 
        customerEmail, 
        restaurantId,
        items, 
        totalPrice
    } = req.body;

    if (
        !customerEmail || 
        !restaurantId ||
        !items
    ) {
        return res.status(400).json({
            status: 'fail',
            message: 'Please provide required fields.',
        });
    } 

    const newOrder = {
        id: orders.length + 1,
        customerEmail,
        restaurantId,
        items,
        totalPrice,
    };

    orders.push(newOrder);

    res.status(201).json({
        status: 'success',
        message: 'Order created successfully',
        data: newOrder,
    });
};

module.exports = { 
    retrieveAllOrders, 
    createOrder 
};
