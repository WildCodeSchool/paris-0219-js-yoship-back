//Imports
const express = require("express")
const path = require('path')

//Router
const router = express.Router()

// Auth
const VerifyToken = require("../routes/auth/verifyToken");
const permit = require("../routes/auth/permission");


router.get('/:fileName', (req, res) => {
  const fileName = req.params.fileName
  console.log(fileName)
  console.log(path.join(__dirname, `./${fileName}`))
    res.sendFile(path.join(__dirname, `./${fileName}`))
});


module.exports = router;
