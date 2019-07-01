const express = require("express")
const connection = require("../../../helper/db")
// Router
const router = express.Router();
// Instantiate server



router.get("/", (req, res) => {
  connection.query('SELECT * FROM driverStats', (err, results) => {
    if (err) {

      // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
      res.status(500).send('Erreur lors de la récupération des driverStats');
    } else {

      // Si tout s'est bien passé, on envoie le résultat de la requête SQL en tant que JSON.
      // res.send("I'm on GET '/user' ")
      res.json(results);
    }
  })
})

router.post("/", (req, res) => {
  const userId = req.uuid
  const formData = req.body
  formData.userId = userId
  // connexion à la base de données, et insertion de l'employé
  connection.query('INSERT INTO driverStats SET ? WHERE userId = ?', [formData, userId], (err, results) => {

    if (err) {
      // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
      console.log(err);

      res.status(500).send("Erreur lors de la sauvegarde des driverStats");
    } else {
      // Si tout s'est bien passé, on envoie un statut "ok".
      res.sendStatus(200);
    }
  });
})

router.put("/", (req, res) => {
  const formData = req.body
  connection.query('UPDATE driverStats SET ?', formData, err => {
    if (err) {
      // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
      console.log(err);
      res.status(500).send("Erreur lors de la modification des driverStats");
    } else {
      // Si tout s'est bien passé, on envoie un statut "ok".
      res.sendStatus(200);
    }
  });
});

router.delete('/', (req, res) => {
  const userId = req.uuid
  const formData = req.body
  formData.userId = userId
  connection.query('DELETE FROM driverStats WHERE userId = ?', userId, err => {
    if (err) {
      // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
      console.log(err);
      res.status(500).send("Erreur lors de la suppression des driver_stats");
    } else {

      // Si tout s'est bien passé, on envoie un statut "ok".
      res.sendStatus(200);
    }
  });
})




module.exports = router;