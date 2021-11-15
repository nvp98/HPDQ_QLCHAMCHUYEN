const express = require("express");
const router = express.Router();
const config = require("../../config/db");
// const Bai = require('../../models/Bai.model');
const sql = require("mssql");
const auth =require("../../middlewares/auth");

router.get("/",auth, (req, res) => {
  try {
    sql.connect(config, (err) => {
      var request = new sql.Request();
      request.query(
        "select * from ChuyenXe join VatTu on ChuyenXe.IDVT = VatTu.IDVT join NhaThau on ChuyenXe.IDNhaThau=NhaThau.IDNhaThau",
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

router.get("/xe/:id",auth, (req, res) => {
  try {
    sql.connect(config, (err) => {
      var request = new sql.Request();
      request
        .input("XeID", sql.Int, req.params.id)
        .query(
          "select * from ChuyenXe where IDXe = @XeID and TinhTrang = 0",
          function (err, recordset) {
            if (!recordset) return res.status(400).json({ msg: "Not Found!" });
            res.status(200).json(recordset.recordset);
          }
        );
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

router.post("/",auth, (req, res) => {
  try {
    sql.connect(config, (err) => {
      var request = new sql.Request();
      request
        .input("IDXe", sql.Int, req.body.IDXe)
        .input("BSX", sql.NVarChar(12), req.body.BSX)
        .input("IDVT", sql.Int, req.body.IDVT)
        .input("IDNhaThau", sql.Int, req.body.IDNhaThau)
        .input("IDBaiXuat", sql.Int, req.body.IDBaiXuat)
        .input("NgayXuat", sql.SmallDateTime, req.body.NgayXuat)
        .input("IDNguoiTao", sql.Int, req.body.IDNguoiTao)
        .input("NgayTao", sql.SmallDateTime, req.body.NgayTao)
        .input("IDBaiNhap", sql.Int, req.body.IDBaiNhap)
        .input("NgayNhap", sql.SmallDateTime, req.body.NgayNhap)
        .input("IDNguoiXacNhan", sql.Int, req.body.IDNguoiXacNhan)
        .input("NgayXacNhan", sql.SmallDateTime, req.body.NgayXacNhan)
        .input("TinhTrang", sql.Int, req.body.TinhTrang)
        .query(
          "insert into ChuyenXe (IDXe,BSX,IDVT,IDNhaThau,IDBaiXuat,NgayXuat,IDNguoiTao,NgayTao,IDBaiNhap,NgayNhap,IDNguoiXacNhan,NgayXacNhan,TinhTrang) values (@IDXe,@BSX,@IDVT,@IDNhaThau,@IDBaiXuat,@NgayXuat,@IDNguoiTao,@NgayTao,@IDBaiNhap,@NgayNhap,@IDNguoiXacNhan,@NgayXacNhan,@TinhTrang)",
          function (err, result) {
            sql.close();
            if (!result) return res.status(400).json({ msg: "Not Found!" });
            res.status(201).json(result);
          }
        );
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

router.post("/:IDChuyen",auth, (req, res) => {
  try {
    sql.connect(config, (err) => {
      var request = new sql.Request();
      request
        .input("id", sql.Int, req.params.IDChuyen)
        .input("NgayNhap", sql.SmallDateTime, req.body.NgayNhap)
        .input("NgayXacNhan", sql.SmallDateTime, req.body.NgayXacNhan)
        .input("TinhTrang", sql.Int, req.body.TinhTrang)
        .input("IDNguoiXacNhan", sql.Int, req.body.IDNguoiXacNhan)
        .query(
          "update ChuyenXe set NgayNhap =@NgayNhap,NgayXacNhan=@NgayXacNhan,TinhTrang=@TinhTrang,IDNguoiXacNhan=@IDNguoiXacNhan where IDChuyen=@id ",
          function (err, result) {
            sql.close();
            if (!result) return res.status(400).json({ msg: "Not Found!" });
            res.status(201).json(result);
          }
        );
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
