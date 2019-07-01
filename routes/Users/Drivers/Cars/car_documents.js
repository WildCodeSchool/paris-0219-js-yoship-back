const express = require("express")
const connection = require('../../../../helper/db')
const router = express.Router();


router.get('/', (req, res) => {
    const idCar = req.idCar
    connection.query('SELECT * FROM car_documents WHERE car_id= ?', idCar, (err, results) => {
        if (err) {
            res.status(500).send('Erreur lors de la récupération des car_documents');
        } else {
            res.json(results);
        }
    })
})

router.post('/', (req, res) => {
    const idCar = req.idCar
    let formData = req.body
    formData.car_id = idCar
    connection.query('INSERT INTO car_documents SET ?', formData, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send("Erreur lors de la sauvegarde des car_documents");
        } else {
            res.sendStatus(200);
        }
    });
});

router.put('/', (req, res) => {
    const idCar = req.idCar
    let formData = req.body
    formData.car_id = idCar
    connection.query('UPDATE car_documents SET ?', [formData], err => {
        if (err) {
            console.log(err);
            res.status(500).send("Erreur lors de la modification des car_documents");
        } else {
            res.sendStatus(200);
        }
    });
});

router.delete('/', (req, res) =>{
    const idCar = req.idCar
    let formData = req.body
    formData.car_id = idCar
    connection.query('DELETE FROM car_documents', err => {
      if (err) {
        console.log(err);
        res.status(500).send("Erreur lors de la suppression des car_documents");
      } else {
        res.sendStatus(200);
      }
    });
  })


module.exports = router;