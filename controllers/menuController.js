const { db } = require('../db.js');

// Retrieve all menu items
const retrieveAllMenu = (req, res) => {
  db.all("SELECT * FROM MENU", [], (err, rows) => {
    if (err) return res.status(500).send("Database error.");

    res.status(200).json({
      status: 'success',
      message: 'Menu retrieved successfully',
      results: rows.length,
      data: rows,
    });
  });
};

// Create a new Menu
const createMenu = (req, res) => {
    const {name,price, restaurant_id} = req.body;
    
    db.get("SELECT * FROM RESTAURANT WHERE ID = ?",
        [restaurant_id],
        (err, row) => {
            if (err) return res.status(500).send("Database error.");

            if (!row) {
                return res.status(403).json({ message: "Not allowed" });
            }
            // Basic validation
            if (!name || !price) {
                return res.status(400).json({ message: 'All fields are required' });
            }
            
                // Insert
            const query = `
                INSERT INTO MENU (NAME, PRICE, RESTAURANT_ID)
                VALUES (?, ?, ?)
            `;
            
            const params = [name,price,restaurant_id];
            db.run(query, params, (err) => {
                if (err) {
                    return res.status(500).send('Database error.');
                }

                res.status(201).json({status: 'success', message: 'menu created successfully', data: this.lastID,
                });
            });
        }
    );
};

module.exports = { 
    retrieveAllMenu, 
    createMenu 
};
