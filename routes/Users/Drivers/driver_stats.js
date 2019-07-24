const express = require("express")
const connection = require("../../../helper/db")
// Router
const router = express.Router();
// Instantiate server

// Auth
const VerifyToken = require('../../auth/verifyToken');
const permit = require('../../auth/permission');

router.get("/", VerifyToken, permit('admin', 'driver'), (req, res) => {
  connection.query('SELECT * FROM driverStats', (err, results) => {
    if (err) {

      //If an error has occurred, then the user is informed of the error
      res.status(500).send('Erreur lors de la récupération des driverStats');
    } else {

      //If everything went well, the result of the SQL query is sent as JSON.
      res.json(results);
    }
  })
})

router.post("/", VerifyToken, permit('admin'), (req, res) => {
  const userId = req.uuid
  const formData = req.body
  formData.userId = userId
  //Connection to the database, and insertion of the employee
  connection.query('INSERT INTO driverStats SET ?', [formData, userId], (err, res) => {

    if (err) {
      //If an error has occurred, then the user is informed of the error
      res.status(500).send("Erreur lors de la sauvegarde des driverStats");
    } else {
      //If everything went well, we send a status "ok".
      res.sendStatus(200);
    }
  });
})

router.put("/", VerifyToken, permit('admin'), (req, res) => {
  const formData = req.body
  connection.query('UPDATE driverStats SET ?', formData, err => {
    if (err) {
      //If an error has occurred, then the user is informed of the error
      res.status(500).send("Erreur lors de la modification des driverStats");
    } else {
      //If everything went well, we send a status "ok".
      res.sendStatus(200);
    }
  });
});

router.delete('/', VerifyToken, permit('admin'), (req, res) => {
  const userId = req.uuid
  const formData = req.body
  formData.userId = userId
  connection.query('DELETE FROM driverStats WHERE userId = ?', userId, err => {
    if (err) {
      //If an error has occurred, then the user is informed of the error
      res.status(500).send("Erreur lors de la suppression des driver_stats");
    } else {
      //If everything went well, we send a status "ok".
      res.sendStatus(200);
    }
  });
})




module.exports = router;