//Imports
const express = require("express")
const connection = require("../../../helper/db")
//Router
const router = express.Router()


// écoute de l'url "/users/:id/driver_papers"
router.get('/', (req, res) => {
    const userId = req.uuid
    const formData = req.body
    formData.userId = userId

    // connection à la base de données, et sélection des driver_papers
    connection.query('SELECT * FROM driverPapers WHERE userId = ?', userId, (err, results) => {
        if (err) {
            // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
            console.log(err);
            res.status(500).send('Erreur lors de la récupération des driverPapers');
        } else {
            // Si tout s'est bien passé, on envoie le résultat de la requête SQL en tant que JSON.
            res.json(results);
        }
    })
})

// écoute de l'url "/users/:id/driver_papers" avec le verbe POST
router.post('/', (req, res) => {
    // récupération des données envoyées
    const userId = req.uuid
    const formData = req.body
    formData.userId = userId

console.log(formData);

    // connexion à la base de données, et insertion des driver_papers
    connection.query('INSERT INTO driverPapers SET ? WHERE userId = ?', [formData, userId], (err, results) => {
        if (err) {
            // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
            console.log(err);
            res.status(500).send("Erreur lors de la sauvegarde des driversPapers");
        } else {
            // Si tout s'est bien passé, on envoie un statut "ok".
            res.sendStatus(200);
        }
    });
});

// Si l'ID est passé en tant que paramètre
// écoute de l'url "/users/:id/driver_papers"
router.put('/', (req, res) => {
    const userId = req.uuid
    const formData = req.body
    formData.userId = userId

    // connection à la base de données, et insertion de l'employé
    connection.query('UPDATE driverPapers SET ? WHERE userId = ?', [formData, userId], err => {
        if (err) {
            // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
            console.log(err);
            res.status(500).send("Erreur lors de la modification des driversPapers");
        } else {
            // Si tout s'est bien passé, on envoie un statut "ok".
            res.sendStatus(200);
        }
    });
});

// écoute de l'url "/"
router.delete('/', (req, res) => {
    const userId = req.uuid
    const formData = req.body
    formData.userId = userId

    // connexion à la base de données, et suppression de l'employé
    connection.query('DELETE FROM driverPapers WHERE userId = ?', userId, err => {
        if (err) {
            // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
            console.log(err);
            res.status(500).send("Erreur lors de la suppression des driversPaper");
        } else {
            // Si tout s'est bien passé, on envoie un statut "ok".
            res.sendStatus(200);
        }
    });
});


module.exports = router;



