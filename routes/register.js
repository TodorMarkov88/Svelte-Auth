const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
require('dotenv').config();
const mysql = require('mysql2/promise');
 
 
 
const registerUser = async (user) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(user.password, salt);
  const pool = await mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    connectionLimit: 10,
  });
  const sql = `INSERT INTO users (firstname, lastname, username, password) VALUES (?, ?, ?, ?)`;
  const values = [user.firstname, user.lastname, user.username, hashedPassword];
  const [rows, fields] = await pool.execute(sql, values);

  return rows.insertId;
}
router.post('/', async function(req, res, next) {
 
  res.header("Access-Control-Allow-Origin", 'http://localhost:5173');
  if(!req.body.username){
    res.status(500).json({success: false, error: true, message: "Missing Username", data: req.body});
    return
  }
  if(!req.body.password){
    res.status(500).json({success: false, error: true, message: "Missing Password", data: req.body});
    return
  }

  const newUser = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    password: req.body.password
  }
 

  try{
    const newUserId = await registerUser(newUser);

    res.json({success: true, error: false, message: "Successful Registration!", data: {id: newUserId, ...newUser}});
  }catch(error){
    console.error(error);
    res.status(500).json({success: false, error: true, message: "Error with db register", data: req.body});
  }

});

module.exports = router;
