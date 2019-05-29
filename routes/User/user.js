// Imports
const express = require("express")

// Router
const router = express.Router();

router.get("/", (req, res) => {
    res.send("I'm on GET '/user' ")
})

module.exports = router;