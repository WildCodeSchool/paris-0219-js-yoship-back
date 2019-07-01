// Imports 
const express = require("express");
const morgan = require("morgan");
const bodyParser = require('body-parser')

// Getting all routes
const routes = require("./routes/index")

// Instantiate server
const app = express();

// Middlewares
app.use(morgan("dev"));

// Body Parser configuration
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

// Sending to the right routes

// Users
app.use("/users", routes.users)
// Drivers
app.use("/users/:uuid/driver-papers", function(req, res, next) {
    // Passes the users id to the next route
    req.uuid = req.params.uuid; 
    next()
},routes.driver_papers)
app.use("/users/:uuid/driver-stats", function(req, res, next) {
    // Passes the users id to the next route
    req.uuid = req.params.uuid; 
    next()
},routes.driver_stats)
// Cars
app.use("/users/:uuid/cars", function(req, res, next) {
    // Passes the users id to the next route
    req.uuid = req.params.uuid; 
    next()
},routes.cars)
// Car documents
app.use("/users/:uuid/cars/:carID/car-documents", function(req, res, next){
    req.idCar = req.params.carID;
    next()
}, routes.car_documents)
// Enterprise
app.use('/users/:uuid/enterprise-info', function(req, res, next) {
    // The enterprise_info route will use the user's id from the users route in parameters to retrieve the corresponding dataset in the database
    // Here we are passing the user's id to the next route
    req.uuid = req.params.uuid; 
    next()
}, routes.enterpriseInfo);


app.get("/", (req, res) => {
    res.send("Hi, I'm on the root '/'")
})

module.exports = app;