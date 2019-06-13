// Imports
const express = require("express");
const connection = require("../../../../helper/db")

// Router
const router = express.Router();


///////////////////////////////////// CAR ///////////////////////////////////////////////

// Retrieve all cars for user:id  (/users/:id/car)
router.get("/car", (req, res) => {
    connection.query('SELECT * FROM car', (err, results) => {
    
        //error 500 (Internal Server Error) 
        if (err) {
            res.status(500).send("Erreur lors de la récupération des données'/users/:id/car/:id'");
        } else {
            res.json(results);
            //res.send("I'm on GET '/users/:id/car' ")
        }
    });
})

// Create a new car for user:id
router.post("/car", (req, res) => {
    console.log("req BODY", req.body)
    const sql = "INSERT INTO car" + 
                "(user_id, brand, model_year, kilometers, horsepower, licence_plate, color, fuel, description) " + 
                "VALUES (?,?,?,?,?,?,?,?,?)"

const values = [
    req.body.user_id,
    req.body.brand,
    req.body.model_year,
    req.body.kilometers,
    req.body.horsepower,
    req.body.licence_plate,
    req.body.color,
    req.body.fuel,
    req.body.description,
]

connection.query(sql, values, (err, result) => {
    if (err)
      throw res
        .status(500)
        .send("There was a problem adding the information to the database.");
    return res.status(200).send(result)
})

});

// Bulk update of all user's cars


// Remove of all user's cars



///////////////////////////////// IDCAR ////////////////////////////////////

// Retrieve details of car:id for user:id  (http://localhost:30../users/iduser/idcar)

router.get("/car/:idCar", (req, res) => {
    const idCar = req.params.idCar;
    //console.log(idCar)
    connection.query('SELECT * FROM car WHERE id = ?', [idCar], (err, results) => { 
        //error 500 (Internal Server Error) 
        if (err) {
            res.status(500).send("Erreur lors de la récupération des données'/users/:id/car/:id'");
        } else {
            //console.log(results)
            res.json(results);
            //res.send(`I'm on GET /users/:id/${idCar}`)
        }
    });
});
    
// Update details of car:id for user:id if it exists
router.put("/car/:idCar", (req, res) => {
    const idCar = req.params.idCar;
    const formData = req.body;
    console.log('console.log formData: ', formData);
    connection.query('UPDATE car SET ? WHERE id = ?', [formData, idCar], (err, results) => {
            //error 500 (Internal Server Error) 
        if (err) {
            console.log(err);
            res.status(500).send("Erreur lors de la modification des données'/users/:id/car/:id'");
        } else {
            //res.sendStatus(200);
            res.send(`I am on PUT /user/:id/${idCar}`)
        }
    });
});
    
// Remove car:id 
router.delete("/car/:idCar", (req, res) => {
    const idCar = req.params.idCar;
    connection.query('DELETE FROM car WHERE id = ?', [idCar], err => {
        //error 500 (Internal Server Error) 
        if (err) {
            res.status(500).send("Erreur lors de la suppression des données'/users/:id/car/:idCar'");
        } else {
            //res.sendStatus(200);
            res.send(`I am on DELETE /users/:id/${idCar}`)
        }
    });
});

module.exports = router;