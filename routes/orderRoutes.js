const express = require('express');
const {
  createOrder,
  retrieveAllOrders,
} = require('../controllers/orderController.js');

const { verifyToken, verifyAdmin } = require('../controllers/authController.js');

const orderRouter = express.Router();

// All orders
orderRouter
  .route('/')
  .post(verifyAdmin, createOrder)        // Add new order
  .get(verifyToken, retrieveAllOrders);  // Get all orders for authenticated users

module.exports = orderRouter;
