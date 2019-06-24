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
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

// Sending to the right routes

// Authentication
app.use("/", routes.auth)
// Users
app.use("/users", routes.users)
// Drivers
app.use("/users/:id/driver_stats", routes.driver_stats)
app.use("/users/:id/driver_papers", routes.driver_papers)
// Cars
app.use("/users/:id/cars", (req, res, next) => {
    // Passes the users id to the next route
    req.id = req.params.id; 
    next()
},routes.cars)
// Car documents
app.use("/users/:id/cars/:carId/car_documents", routes.car_documents)
// Enterprise
app.use('/users/:id/enterprise_info', (req, res, next) => {
    // The enterprise_info route will use the user's id from the users route in parameters to retrieve the corresponding dataset in the database
    // Here we are passing the user's id to the next route
    req.id = req.params.id; 
    next()
}, routes.enterpriseInfo);


app.get("/", (req, res) => {
    res.send("Hi, I'm on the root '/'")
})

module.exports = app;