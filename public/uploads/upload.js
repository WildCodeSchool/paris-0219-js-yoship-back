//Imports
const express = require("express")
const multer = require('multer')
const path = require('path')
const connection = require("../../helper/db")

//Router
const router = express.Router()

// Auth
const VerifyToken = require("../../routes/auth/verifyToken");
const permit = require("../../routes/auth/permission");

router.get('/:fileName', (req, res) => {
  const fileName = req.params.fileName
    res.sendFile(path.join(__dirname, `./${fileName}`))
});

module.exports = router;
