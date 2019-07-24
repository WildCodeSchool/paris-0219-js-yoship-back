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
    destination: './public/uploads',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() +
            path.extname(file.originalname))
    }
})

//listening to the url "/users/:id/driver_papers"
router.get('/', VerifyToken, permit('admin', 'driver'), (req, res) => {
    const userId = req.uuid
    const formData = req.body
    formData.userId = userId

    //connection to the database, and selection of driver_papers
    connection.query('SELECT * FROM driverPapers WHERE userId = ?', userId, (err, results) => {
        if (err) {
            //If an error has occurred, then the user is informed of the error
            res.status(500).send('Erreur lors de la récupération des driverPapers');
        } else {
            //If everything went well, the result of the SQL query is sent as JSON.
            res.json(results);
        }
    })
})

//listening to the url "/users/:id/driver_papers" with the verb POST
router.post('/', VerifyToken, permit('admin', 'driver'), (req, res) => {

    upload(req, res, (err) => {
        if (err) {
            return res.status(500).json(err)
        } else if (req.file == undefined) {
            return res.status(500).send('pas de fichier')
        } else {
            console.log('le fichier uploader est:', req.file)
            return res.status(200).send(req.file)
        }
    }

    )
    //get sent data
    const userId = req.uuid
    const formData = req.body
    formData.userId = userId
    //connection to the database, and insertion of the driver_papers
    connection.query('INSERT INTO driverPapers SET ?', [formData, userId], (err, results) => {
        if (err) {
            //If an error has occurred, then the user is informed of the error
            res.status(500).send("Erreur lors de la sauvegarde des driversPapers");
        } else {
            //If everything went well, we send a status "ok".
            res.sendStatus(200);
        }
    });
});

//If the ID is passed as a parameter
//listening to the url "/users/:id/driver_papers"
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

            const type = req.fileType
            const userId = req.uuid
            const file = req.file.path

            connection.query(`UPDATE driverPapers SET ${type} = ? WHERE userId = ?`, [ file, userId], err => {
                if (err) {
                    //If an error has occurred, then the user is informed of the error
                    res.status(500).send("Erreur lors de la modification des driversPapers");
                } else {
                    //If everything went well, we send a status "ok".
                    res.sendStatus(200);
                }
            })
        }
    })
})

//connection to the database, and insertion of the employee
//listening to the url "/"
router.delete('/', VerifyToken, permit('admin', 'driver'), (req, res) => {
    const userId = req.uuid
    const formData = req.body
    formData.userId = userId

    //connection to the database, and deletion of the employee
    connection.query('DELETE FROM driverPapers WHERE userId = ?', userId, err => {
        if (err) {
            //If an error has occurred, then the user is informed of the error
            res.status(500).send("Erreur lors de la suppression des driversPaper");
        } else {
            //If everything went well, we send a status "ok".
            res.sendStatus(200);
        }
    });
});


module.exports = router;



