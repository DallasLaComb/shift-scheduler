require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});



// Create table if it doesn't exist
const createTableIfNotExists = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS counter (
                id SERIAL PRIMARY KEY,
                num INTEGER DEFAULT 0
            );
        `);

        // Insert default row if none exists
        const result = await pool.query('SELECT * FROM counter WHERE id = 1');
        if (result.rows.length === 0) {
            await pool.query('INSERT INTO counter (num) VALUES (0)');
        }
    } catch (error) {
        console.error('Error creating table:', error.message);
    }
};

// Call the function to create the table if it doesn't exist
createTableIfNotExists();

// Get the current number
app.get('/number', async (req, res) => {
    try {
        const result = await pool.query('SELECT num FROM counter WHERE id = 1');
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// Increment the number
app.post('/increment', async (req, res) => {
    try {
        await pool.query('UPDATE counter SET num = num + 1 WHERE id = 1');
        res.send('Number incremented');
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// Decrement the number
app.post('/decrement', async (req, res) => {
    try {
        await pool.query('UPDATE counter SET num = num - 1 WHERE id = 1');
        res.send('Number decremented');
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
