// Import necessary modules
const express = require('express');
const cors = require('cors');
const { Client } = require('pg');
require('dotenv').config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS and JSON body parsing
app.use(cors());
app.use(express.json());

// Root route for browser check
app.get('/', (req, res) => {
    res.send('Workexperience API is working!');
  });

// Connect to PostgreSQL using environment variables
const db = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  ssl: { rejectUnauthorized: false }
});

db.connect()
  .then(() => console.log('Connected to PostgreSQL database'))
  .catch(err => console.error('Database connection error:', err));

/* ROUTES */

// Root route for confirmation
app.get('/', (req, res) => {
  res.send('Workexperience API is running!');
});

// GET – Fetch all work experiences
app.get('/api/workexperience', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM workexperience ORDER BY startdate DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching data' });
  }
});

// POST – Add new work experience
app.post('/api/workexperience', async (req, res) => {
  const { companyname, jobtitle, location, startdate, enddate, description } = req.body;

  // Basic input validation
  if (!companyname || !jobtitle || !location) {
    return res.status(400).json({ error: 'companyname, jobtitle, and location are required fields.' });
  }

  try {
    const result = await db.query(
      `INSERT INTO workexperience (companyname, jobtitle, location, startdate, enddate, description)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [companyname, jobtitle, location, startdate, enddate, description]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error creating new entry' });
  }
});

// PUT – Update an existing work experience by ID
app.put('/api/workexperience/:id', async (req, res) => {
  const { id } = req.params;
  const { companyname, jobtitle, location, startdate, enddate, description } = req.body;

  try {
    const result = await db.query(
      `UPDATE workexperience
       SET companyname = $1, jobtitle = $2, location = $3, startdate = $4, enddate = $5, description = $6
       WHERE id = $7 RETURNING *`,
      [companyname, jobtitle, location, startdate, enddate, description, id]
    );

    if (result.rowCount === 0) {
      res.status(404).json({ error: 'No entry found to update' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (err) {
    res.status(500).json({ error: 'Error updating entry' });
  }
});

// DELETE – Remove a work experience by ID
app.delete('/api/workexperience/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query('DELETE FROM workexperience WHERE id = $1 RETURNING *', [id]);
    if (result.rowCount === 0) {
      res.status(404).json({ error: 'No entry found to delete' });
    } else {
      res.json({ message: 'Entry deleted', deleted: result.rows[0] });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error deleting entry' });
  }
});

/* Start the server */
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
