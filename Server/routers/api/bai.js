const express = require("express");
const router = express.Router();
const config = require("../../config/db");
// const Bai = require('../../models/Bai.model');
const sql = require("mssql");
const auth =require("../../middlewares/auth")

router.get("/",auth, (req, res) => {
  try {
    sql.connect(config, (err) => {
      var request = new sql.Request();
      request.query("select * from Bai", function (err, recordset) {
        // console.log(recordset,'recorder');
        if (!recordset) return res.status(400).json({ msg: "Not Found!" });
        res.status(200).json(recordset.recordset);
      });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
  // sql.connect(config, (err)=>{
  //     request.query('select * from Bai',function(err,recordset){
  //         res.send(recordset);
  //     })
  // })
});

router.post("/", (req, res) => {
  try {
    sql.connect(config, (err) => {
      var request = new sql.Request();
      request
        .input("TenBai", sql.NVarChar(50), req.body.TenBai)
        .query(
          "insert into Bai (TenBai) values (@TenBai)",
          function (err, result) {
            sql.close();
            if (!result) return res.status(503).json({ msg: "Service Unavailable..." });
            res.status(200).json(result);
          }
        );
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
