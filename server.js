const { app } = require('./index.js');
// added db initialization to server
const db_access = require('./db.js');
const db = db_access.db;

const PORT = 3000;

// Initialize database tables
db.serialize(() => {
  db.run(db_access.createUserTable, (err) => {
    if (err) console.log('Error creating user table:', err.message);
  });
  db.run(db_access.createRestaurantTable, (err) => {
    if (err) console.log('Error creating restaurant table:', err.message);
  });
  db.run(db_access.createMenuTable, (err) => {
    if (err) console.log('Error creating menu table:', err.message);
  });
  db.run(db_access.createOrderTable, (err) => {
    if (err) console.log('Error creating order table:', err.message);
  });
});

// Start listening on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});