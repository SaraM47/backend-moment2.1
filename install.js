// Import the PostgreSQL client
const { Client } = require('pg');

// Load environment variables from .env file
require('dotenv').config();

// Create a new database client using environment variables
const db = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  ssl: {
    rejectUnauthorized: false // Required for Render or external secure PostgreSQL connections
  }
});

// Connect to the PostgreSQL database
db.connect()
  .then(() => {
    console.log('Connected to the database');

    // Create the table if it does not already exist
    return db.query(`
      CREATE TABLE IF NOT EXISTS workexperience (
        id SERIAL PRIMARY KEY,
        companyname TEXT NOT NULL,
        jobtitle TEXT NOT NULL,
        location TEXT NOT NULL,
        startdate DATE,
        enddate DATE,
        description TEXT
      );
    `);
  })
  .then(() => {
    console.log('Table created (or already exists)');
    return db.end(); // Close the database connection
  })
  .catch(err => console.error('Error:', err)); // Log any errors that occur
