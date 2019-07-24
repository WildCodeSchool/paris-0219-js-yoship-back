const express = require("express")
const connection = require('../../helper/db')
// Router
const router = express.Router();

// plugin Uuid
const uuid = require ('uuid/v4');

// Auth
const VerifyToken = require('../auth/verifyToken');
const permit = require('../auth/permission');

router.get("/", VerifyToken, permit('admin'), (req, res) => {
  connection.query('SELECT * FROM users', (err, results) => {
    if (err) 
      //If an error has occurred, then the user is informed of the error
      throw res.status(500).send('Erreur lors de la récupération des employés');
     //If everything went well, the result of the SQL query is sent as JSON.
    return res.status(200).json(results);
    })
})

router.post("/", VerifyToken, permit('admin'), (req, res) => {
  //Get sent data
  const formData = req.body;
  //Connection to the database, and insertion of the employee
  const userUuid = uuid();
  formData.uuid = userUuid;
  //Connection to the database, and insertion of the employee
  connection.query('INSERT INTO users SET ?', formData, (err, res) => {
  
    if (err) {
      //If an error has occurred, then the user is informed of the error
      res.status(500).send("Erreur lors de la sauvegarde de user");
    } else {
      //If everything went well, we send a status "ok".
      res.sendStatus(200);
    }
  });
})

router.put("/", VerifyToken, permit('admin'), (req, res) => {
  const formData = req.body;
  connection.query('UPDATE users SET ?', formData, err => {
    if (err) {
      //If an error has occurred, then the user is informed of the error
      res.status(500).send("Erreur lors de la modification des users");
    } else {
      //If everything went well, we send a status "ok".
      res.sendStatus(200);
    }
  });
});

router.delete('/', VerifyToken, permit('admin'), (req, res) =>{
  connection.query('DELETE FROM users', err => {
    if (err) {
      //If an error has occurred, then the user is informed of the error
      res.status(500).send("Erreur lors de la suppression des users");
    } else {
      //If everything went well, we send a status "ok".
      res.sendStatus(200);
    }
  });
})

router.get("/:uuid", VerifyToken, permit('admin', 'driver'), (req, res) => {
    const userUuid = req.params.uuid
    connection.query(`SELECT * FROM users WHERE uuid = ?`, [userUuid], (err, results) => {
        if (err)
          //If an error has occurred, then the user is informed of the error
          throw res.status(500).send("Erreur lors de la récupération des users");
        if (!results[0])
          throw res.status(404).json({message: "User not found"})
        //If everything went well, the result of the SQL query is sent as JSON.
        return res.status(200).json(results); 
    })
})

router.put("/:uuid", VerifyToken, permit('admin', 'driver'), (req, res) => {
  const userUuid = req.params.uuid;
  const formData = req.body;
  connection.query('UPDATE users SET ? WHERE uuid = ?', [formData, userUuid], err => {
    if (err) {
      //If an error has occurred, then the user is informed of the error
      res.status(500).send("Erreur lors de la modification des users");
    } else {
      //If everything went well, we send a status "ok".
      res.sendStatus(200);
    }
  });
});

router.delete('/:uuid', VerifyToken, permit('admin'), (req, res) =>{
  const userUuid = req.params.uuid;
    connection.query('DELETE FROM users WHERE uuid = ?',[userUuid], err => {
        if (err) 
          //If an error has occurred, then the user is informed of the error
          throw res.status(500).send("Erreur lors de la suppression des users");
        if (req.role !== "admin") return res.status(403).json({message: "User is not authorized to delete users"})
          return res.status(200).json({ message: `User with id ${userUuid} has succesfully been deleted` })
      });
})

module.exports = router;