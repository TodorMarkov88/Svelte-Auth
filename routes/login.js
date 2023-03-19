const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2/promise');
require('dotenv').config();

const findUser = async (connection, username) => {
  const sql = 'SELECT * FROM users WHERE username = ?';
  const [rows, fields] = await connection.execute(sql, [username]);
  return rows[0];
};

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  connectionLimit: 10, // adjust as needed
});

router.post('/', async (req, res) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Credentials', 'true');

  try {
    const { username, password } = req.body;

    if (!username) {
      return res.status(400).json({ success: false, error: true, message: 'Missing username', data: null });
    }

    if (!password) {
      return res.status(400).json({ success: false, error: true, message: 'Missing password', data: null });
    }

    const connection = await pool.getConnection();
    const foundUser = await findUser(connection, username);

    if (!foundUser) {
      connection.release();
      return res.status(404).json({ success: false, error: true, message: 'User not found', data: null });
    }

    const match = await bcrypt.compare(password, foundUser.password);

    if (!match) {
      connection.release();
      return res.status(400).json({ success: false, error: true, message: 'Invalid credentials', data: null });
    }

    const token = jwt.sign({ _id: foundUser.id }, process.env.SECRET || 'default-secret', { expiresIn: '24h' });
   
    res.cookie('token', token, { httpOnly: true, maxAge: (((24 * 60) * 60) * 1000) });
    res.status(200).json({ success: true, error: false, message: 'Login successful', data: null });

    connection.release();
  } catch (error) {
    console.error(error);

    if (error.code === 'MODULE_NOT_FOUND') {
      return res.status(500).json({ success: false, error: true, message: 'Missing required environment variables', data: null });
    }

    if (error instanceof mysql.ConnectionError) {
      return res.status(500).json({ success: false, error: true, message: 'Unable to establish database connection', data: null });
    }

    res.status(500).json({ success: false, error: true, message: 'Internal server error', data: null });
  }
});

module.exports = router;
