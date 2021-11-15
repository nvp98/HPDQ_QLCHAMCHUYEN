const express = require("express");
require("dotenv").config();
const app = express();

// const bodyParser = require("body-parser");
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.json({ extended: false }));
// const db = require("./models");
// db.sequelize.sync();
// const bodyParser = require("body-parser");

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// const db_server = process.env.DB_SERVER;

// const sql = require("mssql");

// config for your database
// const config = {
//   user: "sa",
//   password: "123456",
//   server: db_server,
//   database: "QLCHAMCHUYEN",
//   trustServerCertificate: true,
// };

// app.get("/", function (req, res) {
// //   sql.connect(config, function (err) {
// //     if (err) console.log(err, "connect fail");
// //     res.send("connected sql");
// //   });
// res.send('conect')
// });

app.use("/api/bai", require("./routers/api/bai"));
app.use("/api/nhathau", require("./routers/api/NhaThau"));
app.use("/api/vattu", require("./routers/api/VatTu"));
app.use("/api/xe", require("./routers/api/Xe"));
app.use("/api/chuyenxe", require("./routers/api/ChuyenXe"));
app.use("/api/login", require("./routers/api/Auth"));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () =>
  console.log(`Server listening on http://localhost:${PORT}`)
);
