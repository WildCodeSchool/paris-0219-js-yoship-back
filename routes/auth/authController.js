// Imports
const express = require("express");
const router = express.Router();
const connection = require('../../helper/db')
const bodyParser = require("body-parser");

// plugin Uuid
const uuid = require ('uuid/v4');

// bodyParser config
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// Authorization && Authentication packages
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../../config");
const VerifyToken = require('../auth/verifyToken');
const permit = require('../auth/permission');

// Email package
const nodemailer = require('nodemailer');

require('dotenv').config()

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
  });

// Register a new user
// Access: Public
router.post("/register", (req, res) => {
    // Crypting entered password
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);
    // SQL Request
    const sql = "INSERT INTO users SET ?";
    const userUuid = uuid();
    let formData = req.body
    // Replacing password by the crypted version
    formData.password = hashedPassword;
    // Generates user's uuid
    formData.uuid = userUuid;

    // Prevents from registering an admin role
    if (formData.role !== 'admin') {
        // Connecting to database
        connection.query(sql, formData, (err, user) => {
            console.log(user)

            if (err)
              throw res.status(500).json({
                err: err,
                message:
                  "There was a problem registering the user."
              });

            // Create a token
            const token = jwt.sign({ uuid: formData.uuid, role: formData.role}, config.secret, {
                expiresIn: 86400 // expires in 24 hours
            });

            const url = `http://localhost:3000/confirm/${token}`;

            transporter.sendMail({
                to: req.body.mail,
                subject: 'Confirm Email',
                html: `Please click this link to confirm your email: <a href="${url}">${url}</a>`,
            });
            
            // Response
            return res.status(200).json(user)
        });
    }
});

// Login a user
// Access: Public
router.post("/login", (req, res) => {
    // SQL Request, getting user via email
    const sql = "SELECT * FROM users WHERE mail = ?";
    const values = [req.body.mail];
    // Connecting to database
    connection.query(sql, values, (err, user) => {
        console.log(user[0])
        // Errors
        if (err) throw res.status(500).send("There was a problem finding the users.");
        // The user (email) is incorrect
        if (!user[0]) return res.status(404).send("No user found. This user doesn't exist");

        if (!user[0].emailVerified) return res.status(403).json({ err: "Forbidden", message: "The user email is not verified" });

        // Check password validity
        const passwordIsValid = bcrypt.compareSync(req.body.password, user[0].password);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null, error_msg: "This password is invalid" });
        // If user is found and password is valid
        // Create a token
        const token = jwt.sign({ uuid: user[0].uuid, role: user[0].role}, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });

        res.header("Access-Control-Expose-Headers", "x-access-token")
        res.set("x-access-token", token)

        res.status(200).json({ auth: true, token: token, uuid: user[0].uuid });
    });
})

router.put("/confirmation/:token", VerifyToken, (req, res, next) => {
    // SQL Request, getting user via id
    const sql = "UPDATE users SET emailVerified = ? WHERE uuid = ?";
    console.log(req)
    const values = [
      true,
      req.tokenUuid
    ];
    console.log(req.tokenUuid)
    connection.query(sql, values, (err, user) => {
        console.log(user)
        if (err)
        return res.status(500).send("There was a problem finding the user.");
        res.status(200).send(user);
    });
});


// Route to verify an admin role
router.get("/verify", VerifyToken, permit('admin', 'driver', 'enterprise'), (req, res) => {
    return res.status(200).json({uuid: req.tokenUuid, role: req.role});
})

// Route to verify an admin role
router.get("/verify/admin", VerifyToken, permit('admin'), (req, res) => {
      return res.status(200).json({uuid: req.tokenUuid, role: req.role});
})

// Route to verify a driver role
router.get("/verify/driver", VerifyToken, permit('admin', 'driver'), (req, res) => {
    return res.status(200).json({uuid: req.tokenUuid, role: req.role});
})

// Route to verify an enterprise role
router.get("/verify/enterprise", VerifyToken, permit('admin', 'enterprise'), (req, res) => {
    return res.status(200).json({uuid: req.tokenUuid, role: req.role});
})

// Log out a user
// Access: ?
router.get('/logout', (req, res) => {
    res.status(200).json({ auth: false, token: null });
});

module.exports = router;