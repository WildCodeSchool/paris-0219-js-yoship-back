//Imports
const express = require("express")
const multer = require('multer')
const path = require('path')
const connection = require("../../../helper/db")

//Router
const router = express.Router()

// Auth
const VerifyToken = require('../../auth/verifyToken');
const permit = require('../../auth/permission');

//storage with multer
const storage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() +
            path.extname(file.originalname))
    }
})

//Create an upload instance and receive a single file
// const upload = multer({
//     storage: storage,
//     limits: { fileSize: 1000000 }
// }).single('file')


// écoute de l'url "/users/:id/driver_papers"
router.get('/', VerifyToken, permit('admin', 'driver'), (req, res) => {
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
            res.json(results[0]);
        }
    })
})

// écoute de l'url "/users/:id/driver_papers" avec le verbe POST
router.post('/', VerifyToken, permit('admin', 'driver'), (req, res) => {

    upload(req, res, (err) => {
        if (err) {
            console.log("res", res)
            console.log("req", req)
            return res.status(500).json(err)
        } else if (req.file == undefined) {
            return res.status(500).send('pas de fichier')
        } else {
            console.log('le fichier uploader est:', req.file)
            return res.status(200).send(req.file)
        }
    }

    )
    // récupération des données envoyées
    const userId = req.uuid
    const formData = req.body
    formData.userId = userId
    // connexion à la base de données, et insertion des driver_papers
    connection.query('INSERT INTO driverPapers SET ?', [formData, userId], (err, results) => {
        if (err) {
            // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
            console.log(err);
            console.log(results)
            res.status(500).send("Erreur lors de la sauvegarde des driversPapers");
        } else {
            // Si tout s'est bien passé, on envoie un statut "ok".
            res.sendStatus(200);
        }
    });
});

// Si l'ID est passé en tant que paramètre
// écoute de l'url "/users/:id/driver_papers"
router.put('/:fileType', VerifyToken, permit('admin', 'driver'), (req, res) => {
    req.fileType = req.params.fileType
    const upload = multer({
        storage: storage,
        limits: { fileSize: 1000000 }
    }).single(req.fileType)

    upload(req, res, (err) => {
        if (err) {
            return res.status(500).json(err)
        } else if (req.file == undefined) {
            return res.status(500).send('pas de fichier')
        } else {
            res.sendStatus(200);
            console.log('le fichier uploader est:', req.file.path)
            console.log(req.file)
            const type = req.fileType
            const userId = req.uuid
            const file = req.file.path;

            console.log(type,file)
            connection.query(`UPDATE driverPapers SET ${type} = ? WHERE userId = ?`, [ file, userId], err => {
                if (err) {
                    // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
                    console.log('ok', err);
                    res.status(500).send("Erreur lors de la modification des driversPapers");
                } else {
                    // Si tout s'est bien passé, on envoie un statut "ok".
                }
            })
        }
    })
})


//     // connection à la base de données, et insertion de l'employé

// });

// écoute de l'url "/"
router.delete('/', VerifyToken, permit('admin', 'driver'), (req, res) => {
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



