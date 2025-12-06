const sqlite = require('sqlite3');
const db = new sqlite.Database('foodDelivery.db');

// USER table
const createUserTable = `CREATE TABLE IF NOT EXISTS USER (
  ID INTEGER PRIMARY KEY AUTOINCREMENT,
  EMAIL TEXT UNIQUE NOT NULL,
  ROLE TEXT NOT NULL,
  PASSWORD TEXT NOT NULL
);
`;

// RESTAURANT table
const createRestaurantTable = `CREATE TABLE IF NOT EXISTS RESTAURANT (
  ID INTEGER PRIMARY KEY AUTOINCREMENT,
  NAME TEXT NOT NULL,
  LOCATION TEXT NOT NULL,
  FOOD TEXT,
  RATING REAL
);
`;

// MENU table
const createMenuTable = `CREATE TABLE IF NOT EXISTS MENU (
  ID INTEGER PRIMARY KEY AUTOINCREMENT,
  NAME TEXT NOT NULL,
  PRICE REAL NOT NULL,
  IMG TEXT,
  RESTAURANT_ID INTEGER
);
`;

// ORDER table
const createOrderTable = `CREATE TABLE IF NOT EXISTS ORDER_TABLE (
  ID INTEGER PRIMARY KEY AUTOINCREMENT,
  CUSTOMER_EMAIL TEXT NOT NULL,
  RESTAURANT_ID INTEGER NOT NULL,
  ITEMS TEXT NOT NULL,
  TOTAL_PRICE REAL
);
`;

module.exports = {
  db,
  createUserTable,
  createRestaurantTable,
  createMenuTable,
  createOrderTable,
};
