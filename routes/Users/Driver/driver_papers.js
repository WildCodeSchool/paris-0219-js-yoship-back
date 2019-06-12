//Imports
const express = require("express")
const connection = require("../../../helper/db")
//Router
const router = express.Router()


// écoute de l'url "/users/:id/driver_papers"
router.get('/driver_papers', (req, res) => {
    // connection à la base de données, et sélection des driver_papers
    connection.query('SELECT * FROM driver_papers', (err, results) => {
        if (err) {
            // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
            res.status(500).send('Erreur lors de la récupération des driver_papers');
        } else {
            // Si tout s'est bien passé, on envoie le résultat de la requête SQL en tant que JSON.
            res.json(results);
        }
    })
})

// écoute de l'url "/users/:id/driver_papers" avec le verbe POST
router.post('/driver_papers', (req, res) => {
    // récupération des données envoyées
    const formData = req.body;
    // connexion à la base de données, et insertion des driver_papers
    connection.query('INSERT INTO driver_papers SET ?', formData, (err, results) => {
        if (err) {
            // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
            console.log(err);
            res.status(500).send("Erreur lors de la sauvegarde des drivers_papers");
        } else {
            // Si tout s'est bien passé, on envoie un statut "ok".
            res.sendStatus(200);
        }
    });
});

// Si l'ID est passé en tant que paramètre
// écoute de l'url "/users/:id/driver_papers"
router.put('/driver_papers/:id', (req, res) => {
    // récupération des données envoyées
    const formData = req.body;
    // récupération des données envoyées
    const idDriversPapers = req.params.id;
    // connection à la base de données, et insertion de l'employé
    connection.query('UPDATE driver_papers SET ? WHERE id = ?', [formData, idDriversPapers], err => {
        if (err) {
            // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
            console.log(err);
            res.status(500).send("Erreur lors de la modification d'un employé");
        } else {
            // Si tout s'est bien passé, on envoie un statut "ok".
            res.sendStatus(200);
        }
    });
});

// écoute de l'url "/"
router.delete('/driver_papers/:id', (req, res) => {
    // récupération des données envoyées
    const idDriversPapers = req.params.id;

    // connexion à la base de données, et suppression de l'employé
    connection.query('DELETE FROM driver_papers WHERE id = ?', [idDriversPapers], err => {
        if (err) {
            // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
            console.log(err);
            res.status(500).send("Erreur lors de la suppression des drivers_paper");
        } else {
            // Si tout s'est bien passé, on envoie un statut "ok".
            res.sendStatus(200);
        }
    });
});


module.exports = router;



