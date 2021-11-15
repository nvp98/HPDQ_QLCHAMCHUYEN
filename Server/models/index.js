// const dbConfig =require("../config/db");

// const Sequelize = require("sequelize");
// const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
//     host: dbConfig.HOST,
//     dialect: dbConfig.dialect,
//     operatorsAliases: false,
  
//     pool: {
//       max: dbConfig.pool.max,
//       min: dbConfig.pool.min,
//       acquire: dbConfig.pool.acquire,
//       idle: dbConfig.pool.idle
//     }
//   });

//   const db = {};

// db.Sequelize = Sequelize;
// db.sequelize = sequelize;
// // console.log(db,'db');
// db.Bai = require("./Bai.model.js")(sequelize, Sequelize);

// module.exports = db;