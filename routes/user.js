const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const mysql = require("mysql2/promise");
const dotenv = require("dotenv");
dotenv.config();

const findUserById = async (pool, userId) => {
  const [rows, fields] = await pool.execute(
    "SELECT * FROM users WHERE id = ?",
    [userId]
  );
  return rows[0];
};

router.get("/", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Credentials", "true");
  const token = req.cookies["token"];

  if (!token) {
    return res
      .status(401)
      .json({ success: false, error: true, message: "No Auth!", data: null });
  }

  try {
    const claims = jwt.verify(token, process.env.SECRET);
    if (!claims) {
      return res
        .status(401)
        .json({ success: false, error: true, message: "No Auth!", data: null });
    }

    const pool = await mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_DATABASE,
      port: process.env.DB_PORT,
      connectionLimit: 430,
    });

    const user = await findUserById(pool, claims._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "User not found!",
        data: null,
      });
    }

    const { password, ...userMinusPassword } = user;

    return res.json({
      success: true,
      error: false,
      message: "Authorized Please Proceed!",
      data: userMinusPassword,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: true,
      message: "Error with db query",
      data: null,
    });
  }
});

module.exports = router;
