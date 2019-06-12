// Imports
const express = require("express")
const connection = require('../../../helper/db')
// Router
const router = express.Router();

router.get("/", (req, res) => {
    res.send("I'm on GET '/enterprise_info' ")
})

router.post("/", (req, res) => {
    console.log("req BODY", req.body)
    const sql = "INSERT INTO enterprise_informations" + 
                "(n_siret, address, postcode, city, country, numbe_of_employees, picture, description, mail, phone) " + 
                "VALUES (?,?,?,?,?,?,?,?,?,?)"
    const values = [
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
    connection.query(sql, values, (err, result) => {
        if (err)
          throw res
            .status(500)
            .send("There was a problem adding the information to the database.");
        return res.status(200).send(result)
    })
});

module.exports = router;