// Imports
const express = require("express")
const connection = require('../../../helper/db')

// Router
const router = express.Router();

// Auth
const VerifyToken = require('../../auth/verifyToken');
const permit = require('../../auth/permission');

// Getting enterprise informations for a specific user
router.get("/", VerifyToken, permit('admin', 'enterprise'), (req, res) => {
    // Retrieving user enterprise id
    const userId = req.uuid
    const sql = "SELECT * FROM enterpriseInformations WHERE userId = ?"
    connection.query(sql, userId, (err, results) => {
        if (err)
            throw res
                .status(500)
                .send("There was a problem finding the users.");
        // Return error when no enterprise informations to retrieve for this user
        if (!results[0])
            return res.status(404).send(`No enterprise informations found for ${userId}`)
        // Sends results
        return res.status(200).send(results)
    })
})

// Adding enteprise informations for a user
router.post('/', VerifyToken, permit('admin', 'enterprise'), (req, res) => {
    // SQL Request
    const sql = "INSERT INTO enterpriseInformations SET ?"

    // Retrieving user id
    const userId = req.uuid
    const formData = req.body
    formData.user_id = userId

    // Connecting to the database
    connection.query('INSERT INTO enterpriseInformations SET ?', formData, (err, results) => {
        // Sending a message in case of error
        if (err)
          return res
            .status(500)
            .json({
              error: err,
              message:
                "There was a problem adding enterprise informations to the database."
            });
        // Everything went well, enterprise infos are being added
        return res
          .status(200)
          .json({
            affectedRows: results.affectedRows,
            message: "Enterprise informations have been added"
          });
    });
});

// Updating enterprise_informations for a user
router.put('/', VerifyToken, permit('admin', 'enterprise'), (req, res) => {
    // Retrieving user enterprise id
    const userId = req.uuid
    const formData = req.body
    // SQL REQUEST
    const sql = "UPDATE enterpriseInformations SET ? WHERE userId = ?";
    connection.query(sql, [formData, userId], (err, result) => {
        if (err) throw err;
        return res.sendStatus(200).send(result.affectedRows);
    });
});

// Deleting enterprise_informations for a user
router.delete("/", VerifyToken, permit('admin'), (req, res) => {
    // Retrieving user enterprise id
    const userId = req.uuid
    // SQL Request
    const sql = "DELETE FROM enterpriseInformations WHERE userId = ?";
    connection.query(sql, userId, (err, results) => {
        if (err)
            return res.status(500).send("There was a problem deleting enterprise informations.");
        // Return error when no enterprise informations to delete
        if (results.affectedRows === 0)
            return res.status(404).send("No enterprise informations to delete")
        res.status(200).send(results.affectedRows + " rows affected, enterprise informations have been deleted");
    });
})

module.exports = router;