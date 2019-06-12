const express = require("express")
const connection = require("../../../helper/db")
// Router
const router = express.Router();
// Instantiate server



router.get("/driver_stats", (req, res) => {
  connection.query('SELECT * FROM driver_stats', (err, results) => {
    if (err) {
      
      // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
      res.status(500).send('Erreur lors de la récupération des employés');
    } else {
      
      // Si tout s'est bien passé, on envoie le résultat de la requête SQL en tant que JSON.
      // res.send("I'm on GET '/user' ")
            res.json(results);
          }
    })
})



router.post("/driver_stats", (req, res) => {
  // récupération des données envoyées
  const formData = req.body;
  console.log('console.log formData: ', formData);
  // connexion à la base de données, et insertion de l'employé
  connection.query('INSERT INTO driver_stats SET ?', formData, (err, results) => {

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

router.put("/driver_stats", (req, res) => {
  const formData = req.body;
  connection.query('UPDATE driver_stats SET ?', [formData], err => {
    if (err) {
    // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
      console.log(err);
      res.status(500).send("Erreur lors de la modification des users");
    } else {
      // Si tout s'est bien passé, on envoie un statut "ok".
      res.sendStatus(200);
    }
  });
});

router.delete('/', (req, res) =>{
  connection.query('DELETE FROM driver_stats', err => {
    if (err) {
      // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
      console.log(err);
      res.status(500).send("Erreur lors de la suppression des users");
    } else {

      // Si tout s'est bien passé, on envoie un statut "ok".
      res.sendStatus(200);
    }
  });
})


router.get("/driver_stats/:id", (req, res) => {
    const idDriver_stats = req.params.id
    // res.send(`I'm on GET '/user/:id' - ${id}`)
connection.query(`SELECT * FROM driver_stats WHERE id = ?`, [idDriver_stats], (err, results) => {
        if (err) {

            // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
            res.status(500).send('Erreur lors de la récupération des users');
          } else {
      
            // Si tout s'est bien passé, on envoie le résultat de la requête SQL en tant que JSON.
            res.json(results);
          }
    })
})

router.put("driver_stats/:id", (req, res) => {
  const idDriver_stats = req.params.id;
  const formData = req.body;
  connection.query('UPDATE driver_stats SET ?', [formData, idDriver_stats], err => {
    if (err) {
    // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
      console.log(err);
      res.status(500).send("Erreur lors de la modification des users");
    } else {
      // Si tout s'est bien passé, on envoie un statut "ok".
      res.sendStatus(200);
    }
  });
});

router.delete('/driver_stats:id', (req, res) =>{
  const idDriver_stats = req.params.id;
  connection.query('DELETE FROM driver_stats WHERE id = ?',[idDriver_stats], err => {
    if (err) {
      // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
      console.log(err);
      res.status(500).send("Erreur lors de la suppression des users");
    } else {

      // Si tout s'est bien passé, on envoie un statut "ok".
      res.sendStatus(200);
    }
  });
})



module.exports = router;