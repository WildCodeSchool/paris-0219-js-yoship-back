// Imports
const express = require("express")

// Router
const router = express.Router();

router.get("/", (req, res) => {
    res.send("I'm on GET '/user' ")
})
router.get("/:id", (req, res) => {
    const id = req.params.id
    res.send(`I'm on GET '/user/:id' - ${id}`)
})

module.exports = router;