// Imports
const express = require("express")
const connection = require('../../helper/db')
// Router
const router = express.Router();

router.get("/", (req, res) => {
    res.send("I'm on GET '/user' ")
    connection.query('SELECT * FROM user', (err, results) => {
        if (err) {

            // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
            res.status(500).send('Erreur lors de la récupération des employés');
          } else {
      
            // Si tout s'est bien passé, on envoie le résultat de la requête SQL en tant que JSON.
            res.json(results);
          }
    })
})


router.get("/:id", (req, res) => {
    const id = req.params.id
    res.send(`I'm on GET '/user/:id' - ${id}`)
})

module.exports = router;