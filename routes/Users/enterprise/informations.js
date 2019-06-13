// Imports
const express = require("express")
const connection = require('../../../helper/db')

// Router
const router = express.Router();

// Getting enterprise informations for a specific user
router.get("/", (req, res) => {
    // Retrieving user enterprise id
    const userId = req.id
    const sql = "SELECT * FROM enterprise_informations WHERE user_id = ?"
    connection.query(sql, userId, (err, results) => {
        if (err)
          throw res
            .status(500)
            .send("There was a problem finding the users.");
        // Return error when no enterprise informations to retrieve for this user
        if (!results[0]) 
            return res.status(404).send(`No enterprise informations found for ${userId}`)
        // Sends results
        console.log(results)
        return res.status(200).send(results)
    })
})

// Adding enteprise informations for a user
router.post('/', (req, res) => {
    // Retrieving user id
    const userId = req.id
    console.log(req.id)
    // SQL Request
    const sql = "INSERT INTO enterprise_informations (user_id, n_siret, address, postcode, city, country, number_of_employees, picture, description, mail, phone) VALUES (?,?,?,?,?,?,?,?,?,?,?)"
    const values = [
        userId, 
        req.body.n_siret,
        req.body.address,
        req.body.postcode,
        req.body.city,
        req.body.country,
        req.body.number_of_employees,
        req.body.picture,
        req.body.description,
        req.body.mail,
        req.body.phone
    ]
    // Connecting to the database
    connection.query(sql, values, (err, results) => {
        // Sending a message in case of error
        if (err) return res.status(500).send("There was a problem adding enterprise informations to the database.");
        // Everything went well, enterprise infos are being added
        console.log(results)
        return res.status(200).send("Enterprise informations have been added")
    });
});

// Updating enterprise_informations for a user
router.put('/', (req, res) => {
    // Retrieving user enterprise id
    const userId = req.id
    const formData = req.body
    // SQL REQUEST
    const sql = "UPDATE enterprise_informations SET ? WHERE user_id = ?";
    connection.query(sql, [formData, userId], (err, result) => {
        if (err) throw err;
        return res.sendStatus(200).send(result.affectedRows);
    });
});

// Deleting enterprise_informations for a user
router.delete("/", (req, res) => {
    // Retrieving user enterprise id
    const userId = req.id
    // SQL Request
    const sql = "DELETE FROM enterprise_informations WHERE user_id = ?";
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