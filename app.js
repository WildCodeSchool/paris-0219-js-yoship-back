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
app.use("/user", routes.user)
app.use("/users/:id", routes.driver_stats)

app.get("/", (req, res) => {
    res.send("Hi, I'm on the root '/'")
})

module.exports = app;