// const {MongoClient} = require('mongodb');

// const fireConnection =()=>{
//     const url = 'mongodb://0.0.0.0:27017';
//     const client = new MongoClient(url);
//     const dbName = 'users';
//     const collName = 'AllUsers';
//     const db  = client.db(dbName);
//     const collection = db.collection(collName);

//     if(db && collection) console.log("DB and Collection good to go!");

//     return{
//         DB:db,
//         Coll:collection
//     }
// }

// module.exports={
//     ...fireConnection()
// }

var mysql = require("mysql2/promise");

var con = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  connectionLimit: 1110,
});

module.exports = con;
