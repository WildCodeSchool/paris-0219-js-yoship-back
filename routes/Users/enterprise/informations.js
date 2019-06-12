// Imports
const express = require("express")
const connection = require('../../../helper/db')
// Router
const router = express.Router();

// GETTING DATA FOR ENTERPRISE INFORMATIONS
router.get("/", (req, res) => {
    // Retrieving user enterprise id
    const userId = req.id
    const sql = "SELECT * FROM enterprise_informations WHERE user_id = ?"
    connection.query(sql, userId, (err, result) => {
        if (err)
          throw res
            .status(500)
            .send("There was a problem finding the users.");
        return res.status(200).send(result)
    })
})

// ADDS ENTERPRISE INFORMATIONS
router.post('/', (req, res) => {
    // Retrieving user enterprise id
    const userId = req.id
    console.log(req.id)
    // SQL Request
    const sql = "INSERT INTO enterprise_informations (user_id , n_siret, address, postcode, city, country, number_of_employees, picture, description, mail, phone) VALUES (?,?,?,?,?,?,?,?,?,?,?)"
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
    // connexion à la base de données, et insertion des driver_papers
    connection.query(sql, values, (err, results) => {
        if (err) {
            // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
            console.log(err);
            res.status(500).send("There was a problem adding enterprise informations to the database.");
        } else {
            console.log(results)
            // Si tout s'est bien passé, on envoie un statut "ok".
            res.status(200).send("Enterprise informations have been added")
        }
    });
});

// UPDATES ENTERPRISE INFORMATIONS
router.put('/', (req, res) => {
    // Retrieving user enterprise id
    const userId = req.id
    const formData = req.body
    // SQL REQUEST
    const sql = "UPDATE user SET ? WHERE user_id = ?";
    connection.query(sql, [formData, userId], (err, result) => {
        if (err) throw err;
        return res.sendStatus(200).send(result.affectedRows);
    });
});

// DELETES ENTERPRISE INFORMATIONS
router.delete("/", (req, res) => {
    // Retrieving user enterprise id
    const userId = req.id
    // SQL Request
    const sql = "DELETE FROM enterprise_informations WHERE user_id = ?";
    connection.query(sql, userId, (err, user) => {
        if (err)
          return res
            .status(500)
            .send("There was a problem deleting enterprise informations.");
        res.status(200).send("Enterprise informations have been deleted");
      });
})

module.exports = router;