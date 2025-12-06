const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

const restaurantRouter = require('./routes/restaurantRoutes.js');
const userRouter = require('./routes/userRoutes.js');
const authRouter = require('./routes/authRoutes.js');
const orderRouter = require('./routes/orderRoutes.js');   
const menuRouter = require('./routes/menuRoutes.js');    

// Load environment variables from .env file
dotenv.config();

// Create an instance of the Express application
const app = express();

app.use(cors({
  origin: 'http://127.0.0.1:5500',
  credentials: true
}));

app.use(express.json());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/restaurants', restaurantRouter);
app.use('/api/v1/orders', orderRouter);      
app.use('/api/v1/menus', menuRouter);        

module.exports = { 
  app,
};
