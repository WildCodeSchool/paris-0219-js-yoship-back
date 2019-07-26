// Imports
const express = require("express");
const connection = require("../../../../helper/db")
// Auth
const VerifyToken = require('../../../auth/verifyToken');
const permit = require('../../../auth/permission');
// Router
const router = express.Router();

router.get("/", VerifyToken, permit('admin', 'driver'), (req, res) => {
  //Retrieving user id
  const userId = req.uuid
  const sql = "SELECT * FROM cars WHERE userId = ?"
  connection.query(sql, userId, (err, results) => {
    if (err) {
      console.log(err);
      
      res.status(500).send('Erreur lors de la récupération des voitures');
    } else if (!results[0]){
      return res.status(404).send(`No car found for user ${userId}`)
    } else {      
            res.json(results);
          }
    })
})
  
router.post("/", VerifyToken, permit('admin', 'driver'), (req, res) => {
  const userId = req.uuid
  const formData = req.body
  formData.userId = userId
  connection.query('INSERT INTO cars SET ?', formData, (err, results) => {
    if (err) {
      console.log(err); 
      res.status(500).send(`Erreur lors de la sauvegarde de la voiture pour l'utilisateur ${userId}`);
    } else {
      res.sendStatus(200);
    }
  });
})
  
router.put("/", VerifyToken, permit('admin'), (req, res) => {
  const userId = req.uuid
  const formData = req.body;
  const sql = 'UPDATE cars SET ? WHERE userId = ?'
  connection.query(sql, [formData, userId], err => {
    if (err) {
      console.log(err);
      res.status(500).send(`Erreur lors de la modification des voitures pour l'utilisateur ${userId}`);
    } else {
      res.sendStatus(200);
    }
  });
});
  
router.delete('/', VerifyToken, permit('admin'), (req, res) =>{
  const userId = req.uuid
  const sql = 'DELETE FROM cars WHERE userId = ?'
  connection.query(sql, userId, err => {
    if (err) {
      console.log(err);
      res.status(500).send(`Erreur lors de la suppression des voitures pour l'utilisateur ${userId}`);
    } else {
      res.sendStatus(200);
    }
  });
})

router.get("/:carId", VerifyToken, permit('admin', 'driver'), (req, res) => {
    const idCar = req.params.carId;
    //console.log(idCar)
    connection.query('SELECT * FROM cars WHERE id = ?', [idCar], (err, results) => { 
        //error 500 (Internal Server Error) 
        if (err) {
            res.status(500).send("Erreur lors de la récupération des données'/users/:uuid/car/:id'");
        } else {
            //console.log(results)
            res.json(results);
            //res.send(`I'm on GET /users/:id/${idCar}`)
        }
    });
});
    
// Update details of car:id for user:id if it exists
router.put("/:carId", VerifyToken, permit('admin', 'driver'), (req, res) => {
    const idCar = req.params.carId;
    const formData = req.body;
    console.log('console.log formData: ', formData);
    connection.query('UPDATE cars SET ? WHERE id = ?', [formData, idCar], (err, results) => {
            //error 500 (Internal Server Error) 
        if (err) {
            console.log(err);
            res.status(500).send("Erreur lors de la modification des données'/users/:uuid/car/:id'");
        } else {
            //res.sendStatus(200);
            res.send(`I am on PUT /user/:id/${idCar}`)
        }
    });
});
    
// Remove car:id 
router.delete("/:carId", VerifyToken, permit('admin', 'driver'), (req, res) => {
    const idCar = req.params.carId;
    console.log(idCar);
    
    connection.query('DELETE FROM cars WHERE id = ?', [idCar], err => {
        //error 500 (Internal Server Error) 
        if (err) {
            res.status(500).send("Erreur lors de la suppression des données'/users/:uuid/cars/:idCar'");
        } else {
            //res.sendStatus(200);
            res.send(`I am on DELETE /users/:id/${idCar}`)
        }
    });
});

module.exports = router;