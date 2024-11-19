const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    multipleStatements: true,
    waitForConnections: true,
});

// Ensure the connection uses the correct database context
pool.query(`USE ${process.env.DB_NAME}`, (err) => {
    if (err) {
        console.error('Failed to set database context:', err);
    } else {
        console.log(`Using database: ${process.env.DB_NAME}`);
    }
});

module.exports = pool.promise();