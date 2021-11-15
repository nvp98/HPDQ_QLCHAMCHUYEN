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
      request.query(
        "select x.IDXe, x.BSX, x.SDKX, nt.IDNhaThau, nt. MaNT,nt.TenNT from xe x, NhaThau nt where x.IDNhaThau =nt.IDNhaThau",
        function (err, recordset) {
          if (!recordset) return res.status(503).json({ msg: "Service Unavailable..." });
          res.status(200).json(recordset.recordset);
        }
      );
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

router.post("/", (req, res) => {
  try {
    sql.connect(config, (err) => {
      var request = new sql.Request();
      request
        .input("BSX", sql.NVarChar(12), req.body.BSX)
        .input("SDKX", sql.NVarChar(20), req.body.SDKX)
        .input("IDNhaThau", sql.Int, req.body.IDNhaThau)
        .query(
          "insert into Xe (BSX,SDKX,IDNhaThau) values (@BSX,@SDKX,@IDNhaThau)",
          function (err, result) {
            sql.close();
            if (!result) return res.status(400).json({ msg: "Not Found!" });
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
