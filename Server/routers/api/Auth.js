const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const auth = require("../../middlewares/auth");
const { check, validationResult } = require("express-validator");
const config = require("../../config/db");
const sql = require("mssql");
require("dotenv").config();

// router.get('/',);

router.post(
  "/",
  [check("password", "Password is required.").exists()],
  (req, res) => {
    const { username, password } = req.body;
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      sql.connect(config, (err) => {
        var request = new sql.Request();
        request
          .input("MaNV", sql.NVarChar(50), username)
          .query(
            "select MaNV,MatKhau,HoTen,IDNguoiDung from NguoiDung where MaNV=@MaNV",
             async (err, recordset)=> {
              if (!recordset?.recordset[0])
                return res.status(400).json({ errors: [{ msg: "Invalid User." }] });
              else {
                const isMatch = await bcrypt.compare(password,recordset.recordset[0].MatKhau);
                if (!isMatch) {
                  return res.status(400).json({ errors: [{ msg: "Invalid Password." }] });
                }
                const payload = {
                  user: {
                    MaNV:username,
                    HoTen:recordset.recordset[0].HoTen,
                    IDNguoiDung:recordset.recordset[0].IDNguoiDung,
                  },
                };

                jwt.sign(payload, process.env.JWT_KEY, { expiresIn:"3d" }, (err, token) => {
                  if (err) throw err;
                  res.status(201).json({ token });
                });
              }
            }
          );
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
