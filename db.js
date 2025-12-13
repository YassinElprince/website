const sqlite = require('sqlite3');
const db = new sqlite.Database('foodDelivery.db');
db.run("PRAGMA foreign_keys = ON");

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
  RATING REAL,
  USER_ID INTEGER,
  FOREIGN KEY (USER_ID) REFERENCES USER(ID)
);
`;

// MENU table
const createMenuTable = `CREATE TABLE IF NOT EXISTS MENU (
  ID INTEGER PRIMARY KEY AUTOINCREMENT,
  NAME TEXT NOT NULL,
  PRICE REAL NOT NULL,
  RESTAURANT_ID INTEGER,
  FOREIGN KEY (RESTAURANT_ID) REFERENCES RESTAURANT(ID)
);
`;

// ORDER table
const createOrderTable = `CREATE TABLE IF NOT EXISTS ORDER_TABLE (
  ID INTEGER PRIMARY KEY AUTOINCREMENT,
  CUSTOMER_EMAIL TEXT NOT NULL,
  RESTAURANT_ID INTEGER NOT NULL,
  ITEMS TEXT NOT NULL
);
`;

module.exports = {
  db,
  createUserTable,
  createRestaurantTable,
  createMenuTable,
  createOrderTable,
};
