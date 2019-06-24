// Imports
const express = require("express");
const router = express.Router();
const connection = require('../../helper/db')
const bodyParser = require("body-parser");

// bodyParser config
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// Authorization packages
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../../config");

// Register a new user
// Access: Public
router.post("/register", (req, res) => {
    // Crypting entered password
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);
    // SQL Request
    const sql = "INSERT INTO user SET ?";
    let formData = req.body
    // Replacing password by the crypted version
    formData.password = hashedPassword;
    // Connecting to database
    connection.query(sql, formData, (err, user) => {
        if (err)
          throw res.status(500).json({
            err: err,
            message:
              "There was a problem registering the user."
          });
        // Response
        return res.status(200).json(user)
    });
});

// Login a user
// Access: Public
router.post("/login", (req, res) => {
    // SQL Request, getting user via email
    const sql = "SELECT * FROM user WHERE mail = ?";
    const values = [req.body.mail];
    // Connecting to database
    connection.query(sql, values, (err, user) => {
        // Errors
        if (err) throw res.status(500).send("There was a problem finding the users.");
        // The user (email) is incorrect
        if (!user[0]) return res.status(404).send("No user found. This user doesn't exist");

        // Check password validity
        const passwordIsValid = bcrypt.compareSync(req.body.password, user[0].password);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null, error_msg: "This password is invalid" });

        // If user is found and password is valid
        // Create a token
        const token = jwt.sign({ id: user[0].id, role: user[0].role}, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });

        res.header("Access-Control-Expose-Headers", "x-access-token")
        res.set("x-access-token", token)

        res.status(200).json({ auth: true, token: token });
    });
})

// Log out a user
// Access: ?
router.get('/logout', (req, res) => {
    res.status(200).send({ auth: false, token: null });
});

module.exports = router;