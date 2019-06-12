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



///////////////////////////////// CAR/IDCAR ////////////////////////////////////

// Retrieve details of car:id for user:id  (http://localhost:3031/car/id)
router.get("/car/:carId", (req, res) => {
    connection.query('SELECT * FROM car', (err, results) => {
    
        //error 500 (Internal Server Error) 
        if (err) {
            res.status(500).send("Erreur lors de la récupération des données'/users/:id/car/:id'");
        } else {
            res.json(results);
            //res.send("I'm on GET '/users/:id/car' ")
        }
    });
});

// Update details of car:id for user:id if it exists
router.put("/car/:carId", (req, res) => {
     // récupération des données envoyées
    const idCars = req.params.idCars; 
    const formData = req.body;
    console.log('console.log formData: ', formData);

    connection.query('UPDATE FROM car SET ?', [formData, idCars], (err, results) => {
    
        //error 500 (Internal Server Error) 
        if (err) {
            console.log(err);
            res.status(500).send("Erreur lors de la modification des données'/users/:id/car/:id'");
        } else {
            //res.sendStatus(200);
            res.send("I'm on PUT '/users/:id/car' ")
        }
    });
});

// Remove car:id 
router.delete("/car/:carId", (req, res) => {

    connection.query('DELETE FROM car', err => {
    
        //error 500 (Internal Server Error) 
        if (err) {
            res.status(500).send("Erreur lors de la suppression des données'/users/:id/car/:id'");
        } else {
            //res.sendStatus(200);
            res.send("I'm on DELETE '/users/:id/car/:id ' ")
        }
    });
});

module.exports = router;