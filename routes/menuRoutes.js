const express = require('express');
const {
  createMenu,
  retrieveAllMenu,
} = require('../controllers/menuController.js');

const { verifyToken, verifyAdmin } = require('../controllers/authController.js');

const menuRouter = express.Router();

// All menu items
menuRouter
  .route('/')
  .post(verifyAdmin, createMenu)        // Add new menu item
  .get(verifyToken, retrieveAllMenu);  // Get all menu items for authenticated users

module.exports = menuRouter;
