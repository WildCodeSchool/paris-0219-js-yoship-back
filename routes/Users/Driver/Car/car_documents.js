const express = require("express")
const connection = require('../../../../helper/db')
const router = express.Router();


router.get('/', (req, res) => {
    connection.query('SELECT * FROM car_documents', (err, results) => {
        if (err) {
            res.status(500).send('Erreur lors de la récupération des car_documents');
        } else {
            res.json(results);
        }
    })
})


router.post('/', (req, res) => {
    const formData = req.body;
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

    const formData = req.body;
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