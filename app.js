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
app.use("/users/:id/driver_stats", routes.driver_stats)
app.use("/users/:id/driver_papers", routes.driver_papers)
// Cars
app.use("/users/:id", routes.cars)
// Enterprise
app.use('/users/:id/enterprise_info', function(req, res, next) {
    // The enterprise_info route will use the user's id from the users route in parameters to retrieve the corresponding dataset in the database
    // Here we are passing the user's id to the next route
    req.id = req.params.id; 
    next()
}, routes.enterpriseInfo);

app.get("/", (req, res) => {
    res.send("Hi, I'm on the root '/'")
})

module.exports = app;