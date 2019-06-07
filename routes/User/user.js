const express = require("express")
const connection = require('../../helper/db')
// Router
const router = express.Router();
// Instantiate server

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

router.post("/", (req, res) => {
  // récupération des données envoyées
  const formData = req.body;
  console.log('console.log formData: ', formData);
  // connexion à la base de données, et insertion de l'employé
  connection.query('INSERT INTO user SET ?', formData, (err, results) => {

    if (err) {
      // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
      console.log(err);
      
      res.status(500).send("Erreur lors de la sauvegarde de user");
    } else {
      // Si tout s'est bien passé, on envoie un statut "ok".
      res.sendStatus(200);
    }
  });
  
})


router.get("/:id", (req, res) => {
    const id = req.params.id
    res.send(`I'm on GET '/user/:id' - ${id}`)
})

module.exports = router;