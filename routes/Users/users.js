const express = require("express")
const connection = require('../../helper/db')
// Router
const router = express.Router();

// plugin Uuid
const uuid = require ('uuid/v4');

router.get("/", (req, res) => {
  const formData = req.body;

  connection.query('SELECT * FROM users', (err, results) => {
    if (err) {
      
      // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
      res.status(500).send('Erreur lors de la récupération des users');
    } else {
      
      // Si tout s'est bien passé, on envoie le résultat de la requête SQL en tant que JSON.
      // res.send("I'm on GET '/user' ")
            res.json(results);
          }
    })
})

router.post("/", (req, res) => {
  // récupération des données envoyées
  const formData = req.body;
  // connexion à la base de données, et insertion de l'employé
  const userUuid = uuid();
  formData.uuid = userUuid;
  connection.query('INSERT INTO users SET ?', formData, (err, results) => {

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

router.put("/", (req, res) => {
  const formData = req.body;
  connection.query('UPDATE users SET ?', formData, err => {
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
  connection.query('DELETE FROM users', err => {
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


router.get("/:uuid", (req, res) => {
    const userUuid = req.params.uuid
    
    // res.send(`I'm on GET '/user/:id' - ${id}`)
connection.query(`SELECT * FROM users WHERE uuid = ?`, [userUuid], (err, results) => {
        if (err) {

            // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
            res.status(500).send('Erreur lors de la récupération des users');
          } else {
      
            // Si tout s'est bien passé, on envoie le résultat de la requête SQL en tant que JSON.
            res.json(results);
          }
    })
})


router.put("/:uuid", (req, res) => {
  const userUuid = req.params.uuid;
  const formData = req.body;
  connection.query('UPDATE users SET ? WHERE uuid = ?', [formData, userUuid], err => {
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

router.delete('/:uuid', (req, res) =>{
  const userUuid = req.params.uuid;
  connection.query('DELETE FROM users WHERE uuid = ?',[userUuid], err => {
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