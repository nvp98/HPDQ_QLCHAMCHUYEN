const db_server = process.env.DB_SERVER;
// module.exports = {
//   USER: "sa",
//   PASSWORD: "123456",
//   HOST: db_server,
//   DB: "Test",
// //   trustServerCertificate: true,
//   operatorsAliases: false,
//   dialect: "mssql",
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000,
//   },
// };
module.exports = {
    user: 'sa',
    password: '123456',
    server: db_server, 
    database: 'QLCHAMCHUYEN',
    trustServerCertificate: true, 
};
