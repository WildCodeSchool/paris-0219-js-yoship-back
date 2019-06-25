const express = require("express")
const connection = require('../../helper/db')
// Router
const router = express.Router();

// Auth
const VerifyToken = require('../auth/verifyToken');
const permit = require('../auth/permission');

router.get("/", VerifyToken, permit('admin'), (req, res) => {
  connection.query('SELECT * FROM user', (err, results) => {
    if (err) 
      // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
      throw res.status(500).send('Erreur lors de la récupération des employés');
     // Si tout s'est bien passé, on envoie le résultat de la requête SQL en tant que JSON.
    return res.status(200).json(results);
    })
})

router.post("/", VerifyToken, permit('admin'), (req, res) => {
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

router.put("/", VerifyToken, permit('admin'), (req, res) => {
  const formData = req.body;
  connection.query('UPDATE user SET ?', [formData], err => {
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

router.delete('/', VerifyToken, permit('admin'), (req, res) =>{
  connection.query('DELETE FROM user', err => {
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

router.get("/:id", VerifyToken, permit('admin', 'driver'), (req, res) => {
    const idUser = req.params.id
    connection.query(`SELECT * FROM user WHERE id = ?`, [idUser], (err, results) => {
        if (err)
          // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
          throw res.status(500).send("Erreur lors de la récupération des users");
        // Si tout s'est bien passé, on envoie le résultat de la requête SQL en tant que JSON.
        return res.status(200).json(results); 
    })
})

router.put("/:id", permit('admin', 'driver'), (req, res) => {
  const idUser = req.params.id;
  const formData = req.body;
  connection.query('UPDATE user SET ? WHERE id = ?', [formData, idUser], err => {
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

router.delete('/:id', VerifyToken, permit('admin'), (req, res) =>{
  const idUser = req.params.id;
    connection.query('DELETE FROM user WHERE id = ?',[idUser], err => {
        if (err) 
          // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
          throw res.status(500).send("Erreur lors de la suppression des users");
        if (req.role.name !== "admin") return res.status(403).json({message: "User is not authorized to delete users"})
    
        return res.status(200).json({ message: `User with id ${idUser} has succesfully been deleted` })
      });
})

module.exports = router;