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
app.use("/users", routes.users)
// app.use("/users/:id/car", routes.car)
app.use("/users/:id", routes.cars)

app.get("/", (req, res) => {
    res.send("Hi, I'm on the root '/'")
})

module.exports = app;