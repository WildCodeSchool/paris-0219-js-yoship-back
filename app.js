// Imports 
const express = require("express");
const morgan = require("morgan");
const bodyParser = require('body-parser')
const cors = require('cors')

// Getting all routes
const routes = require("./routes/index")

// Instantiate server
const app = express();


// Middlewares
app.use(morgan("dev"));
app.use(cors());

// Body Parser configuration

app.use(bodyParser.json({limit: '10mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))

// Sending to the right routes

// Authentication
app.use("/", routes.auth)
// Upload
app.use("/uploads", routes.upload)

// Users
app.use("/users", routes.users)
// Drivers
app.use("/users/:uuid/driverPapers/", (req, res, next) => {
    // Passes the users id to the next route
    req.uuid = req.params.uuid; 
    next()
},routes.driver_papers)

app.use("/users/:uuid/driverStats", (req, res, next) => {
    // Passes the users id to the next route
    req.uuid = req.params.uuid; 
    next()
},routes.driver_stats)
// Cars
app.use("/users/:uuid/cars", (req, res, next) => {
    // Passes the users id to the next route
    req.uuid = req.params.uuid; 
    next()
},routes.cars)
// Car documents
app.use("/users/:uuid/cars/:carId/carDocuments", (req, res, next) => {
    req.idCar = req.params.carId;
    next()
}, routes.car_documents)
// Enterprise
app.use('/users/:uuid/enterpriseInfo', (req, res, next) => {
    // The enterprise_info route will use the user's id from the users route in parameters to retrieve the corresponding dataset in the database
    // Here we are passing the user's id to the next route
    req.uuid = req.params.uuid; 
    next()
}, routes.enterpriseInfo);

// only contact
app.use('/contact',function(req, res, next){
    next()
},routes.contact)

app.get("/", function(req, res){
    res.send("Hi, I'm on the root '/'")
})

module.exports = app;