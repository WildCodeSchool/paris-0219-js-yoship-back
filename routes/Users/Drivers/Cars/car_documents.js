const express = require("express")
const connection = require('../../../../helper/db')
const router = express.Router();


router.get('/', (req, res) => {
    const idCar = req.idCar
    connection.query('SELECT * FROM carDocuments WHERE carId= ?', idCar, (err, results) => {
        if (err) {
            res.status(500).send('Erreur lors de la récupération des carDocuments');
        } else {
            res.json(results);
        }
    })
})

router.post('/', (req, res) => {
    const idCar = req.idCar
    let formData = req.body
    formData.carId = idCar
    connection.query('INSERT INTO carDocuments SET ?', formData, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send("Erreur lors de la sauvegarde des carDocuments");
        } else {
            res.sendStatus(200);
        }
    });
});

router.put('/', (req, res) => {
    const idCar = req.idCar
    let formData = req.body
    formData.carId = idCar
    connection.query('UPDATE carDocuments SET ?', [formData], err => {
        if (err) {
            console.log(err);
            res.status(500).send("Erreur lors de la modification des carDocuments");
        } else {
            res.sendStatus(200);
        }
    });
});

router.delete('/', (req, res) =>{
    const idCar = req.idCar
    let formData = req.body
    formData.carId = idCar
    connection.query('DELETE FROM carDocuments', err => {
      if (err) {
        console.log(err);
        res.status(500).send("Erreur lors de la suppression des carDocuments");
      } else {
        res.sendStatus(200);
      }
    });
  })


module.exports = router;