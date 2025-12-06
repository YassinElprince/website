const { menus } = require('../models/menu');

// Retrieve all menu items
const retrieveAllMenu = (req, res) => {
    const allmenus = menus;
    res.status(200).json({
        status: 'success',
        message: 'Menu retrieved successfully',
        results: allmenus.length,
        data: allmenus,
    });
};

// Create a new menu item
const createMenu = (req, res) => {
    const { 
        restaurantId,
        name, 
        price, 
        img,
    } = req.body;

    if (
        !restaurantId ||
        !name || 
        !price
    ) {
        return res.status(400).json({
            status: 'fail',
            message: 'Please provide required fields.',
        });
    } 

    const newMenuItem = {
        id: menus.length + 1,
        restaurantId,
        name,
        price,
        img,
    };

    menus.push(newMenuItem);

    res.status(201).json({
        status: 'success',
        message: 'Menu item created successfully',
        data: newMenuItem,
    });
};

module.exports = { 
    retrieveAllMenu, 
    createMenu 
};
