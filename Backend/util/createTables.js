const db = require('./database');
const fs = require('fs');
const path = require('path');

module.exports = class Tables {
  static async createTables() {
    try {
      // Read the SQL file
      const filePath = path.join(__dirname, '/TABLE.sql'); // Ensure the path is correct
      console.log(filePath)
      const sqlQueries = fs.readFileSync(filePath, 'utf8');

      // Execute the SQL file contents
      await db.query(sqlQueries);
      console.log('Tables created successfully');
    } catch (error) {
      console.error('Error creating tables:', error);
    }
  }
};
