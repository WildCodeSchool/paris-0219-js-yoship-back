const express = require("express")
const connection = require("../../../helper/db")
// Router
const router = express.Router();
// Instantiate server



router.get("/", (req, res) => {
  connection.query('SELECT * FROM driver_stats', (err, results) => {
    if (err) {
      
      // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
      res.status(500).send('Erreur lors de la récupération des driver_stats');
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
  formData.user_id = userId
  // connexion à la base de données, et insertion de l'employé
  connection.query('INSERT INTO driver_stats SET ? WHERE user_id = ?', [formData, userId], (err, results) => {

    if (err) {
      // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
      console.log(err);
      
      res.status(500).send("Erreur lors de la sauvegarde des driver_stats");
    } else {
      // Si tout s'est bien passé, on envoie un statut "ok".
      res.sendStatus(200);
    }
  });
})

router.put("/", (req, res) => {
  const formData = req.body
  connection.query('UPDATE driver_stats SET ?', formData, err => {
    if (err) {
    // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
      console.log(err);
      res.status(500).send("Erreur lors de la modification des driver_stats");
    } else { 
      // Si tout s'est bien passé, on envoie un statut "ok".
      res.sendStatus(200);
    }
  });
});

router.delete('/', (req, res) =>{
  const userId = req.uuid
  const formData = req.body
  formData.user_id = userId
  connection.query('DELETE FROM driver_stats WHERE user_id = ?', userId, err => {
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